

import {Router} from 'express';
import {AddCommanderCard, GetAllCommanderCards} from "../Controllers/CommanderCardController";
import {EditCommanderCard} from "../../Controllers/EditCardsController";
const router = Router();

router.get("/getAll", GetAllCommanderCards)
router.post("/add", AddCommanderCard)

router.put("/update/:id", EditCommanderCard) 
export default router;
