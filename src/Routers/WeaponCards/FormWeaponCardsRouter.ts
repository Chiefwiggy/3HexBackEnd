import {Router} from "express";
import {AddWeaponForm} from "../../Controllers/AddCardsController";
import {GetAllWeaponForms} from "../../Controllers/GetCardDataController";
import {EditFormWeapon} from "../../Controllers/EditCardsController";


const router = Router();

router.get('/getAll', GetAllWeaponForms);
router.post("/add", AddWeaponForm);
router.put("/update/:id", EditFormWeapon);

export default router;