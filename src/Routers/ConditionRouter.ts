import {Router} from 'express'
import {AddCondition, GetAllConditions} from "../Controllers/ConditionController";

const router = Router();

router.get("/getAll", GetAllConditions)
router.post("/add", AddCondition)

export default router;