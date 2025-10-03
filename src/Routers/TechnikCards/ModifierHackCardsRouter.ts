import {Router} from "express";
import {GetAllHackModifiers} from "../../Controllers/GetCardDataController";
import {AddHackElse, AddHackProtocol, AddHackUtil} from "../../Controllers/AddCardsController";



const router = Router();

router.get('/getAll', GetAllHackModifiers);
router.post("/util/add", AddHackUtil);
router.post("/else/add", AddHackElse);
router.put("/update/:id", () => {});

export default router;