

import {Router} from 'express';
import {AddCommanderCard, GetAllCommanderCards} from "../Controllers/CommanderCardController";
import {AddConditionCard} from "../Controllers/AddCardsController";
import {GetAllConditionCards} from "../Controllers/GetCardDataController";
import {EditCommanderCard} from "../../Controllers/EditCardsController";

const router = Router();

router.get("/getAll", GetAllConditionCards)
router.post("/add", AddConditionCard)
router.put("/update/:id", EditCommanderCard) 
export default router;
