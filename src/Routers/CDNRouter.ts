import {Router} from "express";
import {UploadImage} from "../Controllers/CDNController";
import {single_large_upload, single_standard_upload} from "../Utils/MulterMiddleware";

const router = Router();

router.post("/image/upload", single_standard_upload, UploadImage)

router.post("/image/large/upload", single_large_upload, UploadImage)


export default router;
