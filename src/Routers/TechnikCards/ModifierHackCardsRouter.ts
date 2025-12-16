import {Router} from "express";
import {GetAllHackModifiers} from "../../Controllers/GetCardDataController";
import {AddHackElse, AddHackProtocol, AddHackUtil} from "../../Controllers/AddCardsController";
import {EditModifierHack} from "../../Controllers/EditCardsController";



const router = Router();

router.get('/getAll', GetAllHackModifiers);
router.post("/util/add", AddHackUtil);
router.post("/else/add", AddHackElse);
router.put("/util/update/:id", EditModifierHack);
router.put("/else/update/:id", EditModifierHack);

export default router;