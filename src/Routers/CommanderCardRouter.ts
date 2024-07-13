

import {Router} from 'express';
import {AddCommanderCard, GetAllCommanderCards} from "../Controllers/CommanderCardController";

const router = Router();

router.get("/getAll", GetAllCommanderCards)
router.post("/add", AddCommanderCard)
export default router;