import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import ImageLibraryModel from "../Models/ImageLibraryModel";


export const GetImageLibraryUrlByKey = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const imageKey = req.params.key;
        if (!imageKey || imageKey == "all") {
            res.status(400).json({
                message: `Key was not included/allowed.`
            })
        }
        const entry = await GetImageByKeyHelper(imageKey);

        if (entry) {
            res.status(200).json({
                message: "Found image!",
                imageKey: imageKey,
                imageUrl: entry.imageUrl
            })
        } else {
            res.status(404).json({
                message: "Image not found.",
                imageKey: imageKey
            })
        }


    })
    .exec();

export const GetImageByKeyHelper = async (key: string) => {
    const entry = await ImageLibraryModel.findOne({ imageKey: key });
    return entry;
};

export const GetImagesForOwner = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const entries = await ImageLibraryModel.find({owner: user._id})
            res.status(200).json({
                message: `All images for ${user.name}`,
                images: entries
            })
        } catch (e) {
            res.status(404).json({
                message: "Image not found for user.",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()

export const GetAllImages = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const entries = await ImageLibraryModel.find()
            res.status(200).json({
                message: `All images found.`,
                images: entries
            })
        } catch (e) {
            res.status(404).json({
                message: "Images not found.",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()