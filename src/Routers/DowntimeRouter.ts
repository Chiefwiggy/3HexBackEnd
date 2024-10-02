import { Router } from "express";
import {AddClass, GetAllClasses, GetAllClassesOfTier} from "../Controllers/ClassController";
import {AddDowntimeActivity, GetAllDowntimeActivities} from "../Controllers/DowntimeController";

const router = Router();

router.get("/getAll", GetAllDowntimeActivities)
router.post("/add", AddDowntimeActivity);

export default router;