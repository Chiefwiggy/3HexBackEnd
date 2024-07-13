import {Router} from "express";
import {AddWeaponSkill} from "../../Controllers/AddCardsController";
import {GetAllWeaponSkills} from "../../Controllers/GetCardDataController";


const router = Router();

router.get('/getAll', GetAllWeaponSkills);
router.post("/add", AddWeaponSkill);
router.put("/update/:id", () => {});

export default router;