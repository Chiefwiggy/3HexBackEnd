import { Router } from "express";
import {AddClass, GetAllClassesOfTier} from "../Controllers/ClassController";

const router = Router();

router.get("/getAllOfTier/:tier", GetAllClassesOfTier);
router.post("/add", AddClass)

export default router;