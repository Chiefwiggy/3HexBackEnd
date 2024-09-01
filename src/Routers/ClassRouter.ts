import { Router } from "express";
import {AddClass, GetAllClasses, GetAllClassesOfTier} from "../Controllers/ClassController";

const router = Router();

router.get("/getAllOfTier/:tier", GetAllClassesOfTier);
router.get("/getAll", GetAllClasses);
router.post("/add", AddClass)

export default router;