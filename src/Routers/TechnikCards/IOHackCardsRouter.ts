import {Router} from "express";
import {GetAllHackIO} from "../../Controllers/GetCardDataController";
import {AddHackIO} from "../../Controllers/AddCardsController";



const router = Router();

router.get('/getAll', GetAllHackIO);
router.post("/add", AddHackIO);
router.put("/update/:id", () => {});

export default router;