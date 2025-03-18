import {Router} from 'express'
import {AddMount, GetAllMounts} from "../../Controllers/Equipment/MountController";


const router = Router();

router.get("/getAll", GetAllMounts)
router.post("/add", AddMount);

export default router;