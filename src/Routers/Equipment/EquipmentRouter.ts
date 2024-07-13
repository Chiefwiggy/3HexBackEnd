import {Router} from 'express'
import ArmorRouter from "./ArmorRouter";


const router = Router();

router.use("/armor", ArmorRouter);

export default router;