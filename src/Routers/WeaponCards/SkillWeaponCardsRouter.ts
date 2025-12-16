import {Router} from "express";
import {AddWeaponOrder, AddWeaponSkill} from "../../Controllers/AddCardsController";
import {GetAllWeaponSkills} from "../../Controllers/GetCardDataController";
import {EditSkillWeapon} from "../../Controllers/EditCardsController";


const router = Router();

router.get('/getAll', GetAllWeaponSkills);
router.post("/add", AddWeaponSkill);
router.post("/order/add", AddWeaponOrder);
router.put("/update/:id", EditSkillWeapon);
router.put("/order/update/:id", EditSkillWeapon)

export default router;