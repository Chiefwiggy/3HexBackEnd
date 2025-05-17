import {Router} from "express";
import {AddWeaponOrder, AddWeaponSkill} from "../../Controllers/AddCardsController";
import {GetAllWeaponSkills} from "../../Controllers/GetCardDataController";


const router = Router();

router.get('/getAll', GetAllWeaponSkills);
router.post("/add", AddWeaponSkill);
router.post("/order/add", AddWeaponOrder);
router.put("/update/:id", () => {});

export default router;