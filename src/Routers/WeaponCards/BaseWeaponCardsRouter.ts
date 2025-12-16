import {Router} from "express";
import {AddBaseWeapon} from "../../Controllers/AddCardsController";
import {GetAllWeaponBases} from "../../Controllers/GetCardDataController";
import {EditBaseWeapon} from "../../Controllers/EditCardsController";


const router = Router();

router.get('/getAll', GetAllWeaponBases);
router.post("/add", AddBaseWeapon);
router.put("/update/:id", EditBaseWeapon);

export default router;