import {Router} from 'express'
import ArmorRouter from "./ArmorRouter";
import ConsumableModel from "../../Models/Equipment/ConsumableModel";
import ConsumableRouter from "./ConsumableRouter";
import ShieldRouter from "./ShieldRouter";


const router = Router();

router.use("/armor", ArmorRouter);
router.use("/consumable", ConsumableRouter)
router.use("/shield", ShieldRouter);

export default router;