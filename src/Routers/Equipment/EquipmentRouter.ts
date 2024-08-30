import {Router} from 'express'
import ArmorRouter from "./ArmorRouter";
import ConsumableModel from "../../Models/Equipment/ConsumableModel";
import ConsumableRouter from "./ConsumableRouter";


const router = Router();

router.use("/armor", ArmorRouter);
router.use("/consumable", ConsumableRouter)

export default router;