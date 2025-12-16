import {Router} from "express";
import {GetAllHackBases} from "../../Controllers/GetCardDataController";
import {AddHackFunction} from "../../Controllers/AddCardsController";
import {EditBaseHack} from "../../Controllers/EditCardsController";



const router = Router();

router.get('/getAll', GetAllHackBases);
router.post("/add", AddHackFunction);
router.put("/update/:id", EditBaseHack);

export default router;