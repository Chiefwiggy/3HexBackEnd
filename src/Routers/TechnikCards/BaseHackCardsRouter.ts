import {Router} from "express";
import {GetAllHackBases} from "../../Controllers/GetCardDataController";
import {AddHackFunction} from "../../Controllers/AddCardsController";



const router = Router();

router.get('/getAll', GetAllHackBases);
router.post("/add", AddHackFunction);
router.put("/update/:id", () => {});

export default router;