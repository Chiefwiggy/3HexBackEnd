import {Router} from "express";
import {AddWeaponForm} from "../../Controllers/AddCardsController";
import {GetAllWeaponForms} from "../../Controllers/GetCardDataController";


const router = Router();

router.get('/getAll', GetAllWeaponForms);
router.post("/add", AddWeaponForm);
router.put("/update/:id", () => {});

export default router;