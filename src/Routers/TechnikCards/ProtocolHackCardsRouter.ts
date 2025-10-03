import {Router} from "express";
import {GetAllHackModifiers, GetAllHackProtocols} from "../../Controllers/GetCardDataController";
import {AddHackElse, AddHackProtocol, AddHackUtil} from "../../Controllers/AddCardsController";



const router = Router();

router.get('/getAll', GetAllHackProtocols);
router.post("/add", AddHackProtocol);
router.put("/update/:id", () => {});

export default router;