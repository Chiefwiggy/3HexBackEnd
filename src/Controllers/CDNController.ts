import multer from "multer"
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import {HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3";
import {s3} from "../index";
import {GetImageByKeyHelper} from "./ImageLibraryController";
import ImageLibraryModel from "../Models/ImageLibraryModel";




export const UploadImage = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {

            if (!req.file) {
                res.status(400).json({message: "No file uploaded."})
                return;
            }

            const imageType = req.body.image_type;
            if (!imageType) {
                res.status(400).json({message: "Missing image_type in request body."})
                return;
            }

            const imageLibraryKey = req.body.image_libkey;
            if (!imageLibraryKey) {
                res.status(400).json({
                    message: "Missing image_libkey in request body."
                })
                return;
            }

            const entry = await GetImageByKeyHelper(imageLibraryKey);
            if (entry) {
                res.status(409).json({
                    message: `${imageLibraryKey} already exists in db.`,
                })
            }

            const key = `${user._id}/${imageType}/${req.file.originalname}`;

            try {
                await s3.send(new HeadObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: key,
                }));
                // If HeadObjectCommand succeeds, file exists → fail
                res.status(409).json({
                    message: "File already exists.",
                    location: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
                });
                return;
            } catch (headErr: any) {
                if (headErr.name !== "NotFound") {
                    console.error("S3 HeadObject Error:", headErr);
                    res.status(500).json({
                        message: "Error checking file existence",
                        error: headErr.message,
                    });
                    return;
                }
                // If NotFound, proceed to upload
            }

            if (!user.userPermissions.includes("image_warden") && !user.userPermissions.includes("admin")) {
                const listCmd = new ListObjectsV2Command({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Prefix: `${user._id}/`
                });
                const existingFiles = await s3.send(listCmd);

                // Calculate total size in the folder
                let folderSize = 0;
                if (existingFiles.Contents) {
                    folderSize = existingFiles.Contents.reduce((acc, obj) => acc + (obj.Size ?? 0), 0);
                }

                if (folderSize + req.file.size > 250 * 1024 * 1024) {
                    res.status(413).json({
                        message: `Folder size limit exceeded. Max allowed: 250 MB`,
                        currentFolderSize: (folderSize / 1024 / 1024).toFixed(2) + " MB",
                        newFileSize: (req.file.size / 1024 / 1024).toFixed(2) + " MB"
                    });
                    return
                }
            }



            const params: PutObjectCommandInput = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: "public-read"
            }

            const command = new PutObjectCommand(params);
            await s3.send(command);

            const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

            try {
                const newLibEntry = new ImageLibraryModel({
                    imageKey: imageLibraryKey,
                    imageUrl: fileUrl,
                    owner: user._id,
                    altText: req.body.alt_text ?? ""
                });

                await newLibEntry.save();
            } catch (err) {
                res.status(500).json({
                    message: `Failed to save image key ${imageLibraryKey}`
                })
            }

            res.json({ message: 'File uploaded successfully', url: fileUrl });


        } catch (err) {
          console.error("S3 Upload Error:", err);
          res.status(500).json({
            message: "Error uploading file",
            error: err instanceof Error ? err.message : err,
          });
        }

    })
    .exec()