

import {Router} from 'express';
import {AddCommanderCard, GetAllCommanderCards} from "../Controllers/CommanderCardController";
import {AddConditionCard} from "../Controllers/AddCardsController";
import {GetAllConditionCards} from "../Controllers/GetCardDataController";

const router = Router();

router.get("/getAll", GetAllConditionCards)
router.post("/add", AddConditionCard)
export default router;