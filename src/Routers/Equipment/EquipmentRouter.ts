import {Router} from 'express'
import ArmorRouter from "./ArmorRouter";
import ConsumableModel from "../../Models/Equipment/ConsumableModel";
import ConsumableRouter from "./ConsumableRouter";
import ShieldRouter from "./ShieldRouter";
import MountRouter from "./MountRouter";


const router = Router();

router.use("/armor", ArmorRouter);
router.use("/consumable", ConsumableRouter)
router.use("/shield", ShieldRouter);
router.use('/mount', MountRouter);

export default router;