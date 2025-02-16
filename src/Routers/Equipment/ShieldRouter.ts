import {Router} from 'express'
import {AddShield, GetAllShields} from "../../Controllers/Equipment/ShieldController";


const router = Router();

router.get("/getAll", GetAllShields)
router.post("/add", AddShield);

export default router;