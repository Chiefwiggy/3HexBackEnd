import {Router} from "express";
import {AddBaseWeapon} from "../../Controllers/AddCardsController";
import {GetAllWeaponBases} from "../../Controllers/GetCardDataController";


const router = Router();

router.get('/getAll', GetAllWeaponBases);
router.post("/add", AddBaseWeapon);
router.put("/update/:id", () => {});

export default router;