import {Router} from 'express'
import ArmorRouter from "./ArmorRouter";
import ConsumableModel from "../../Models/Equipment/ConsumableModel";


const router = Router();

router.use("/armor", ArmorRouter);
router.use("/consumable", ConsumableModel)

export default router;