import {Router} from 'express'
import {AddArmor, GetAllArmor, GetArmorById} from "../../Controllers/Equipment/ArmorController";

const router = Router();

router.get("/getAll", GetAllArmor)
router.post("/add", AddArmor);
router.get("/get/:armorID", GetArmorById)

export default router;