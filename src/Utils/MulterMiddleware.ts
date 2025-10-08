import multer from "multer";
import {Request, Response, NextFunction} from "express";


export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024} //5 MB max
});

export const large_upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024} //25 MB max
});

export const single_standard_upload = (req: Request , res: Response, next: NextFunction) => {
    upload.single("file")(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).json({ message: "File too large. Max size is 5 MB." });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: err.message });
        }
        next();
    })
}

export const single_large_upload = (req: Request , res: Response, next: NextFunction) => {
    large_upload.single("file")(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).json({ message: "File too large. Max size is 5 MB." });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: err.message });
        }
        next();
    })
}