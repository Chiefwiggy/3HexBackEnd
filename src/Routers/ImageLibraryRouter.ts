import {Router} from "express"
import {GetAllImages, GetImageLibraryUrlByKey, GetImagesForOwner} from "../Controllers/ImageLibraryController";

const router = Router();

router.get("/gallery", GetImagesForOwner)
router.get("/get/all", GetAllImages)
router.get("/get/:key", GetImageLibraryUrlByKey)



export default router;

