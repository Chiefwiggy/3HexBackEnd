import {Router} from 'express'
import BaseHackCardsRouter from "./BaseHackCardsRouter";
import IOHackCardsRouter from "./IOHackCardsRouter";
import ModifierHackCardsRouter from "./ModifierHackCardsRouter";
import {
    GetAllHacks,
    GetAllHacksPossibleForUser,
    GetAllHacksPreparedForCharacter
} from "../../Controllers/GetCardDataController";
import ProtocolHackCardsRouter from "./ProtocolHackCardsRouter";


const router = Router();

router.get('/getAll', GetAllHacks)
router.get("/getValid/:characterId", () => {})
router.get("/getPossible/:characterId", GetAllHacksPossibleForUser)

router.get("/getPrepared/:characterId", GetAllHacksPreparedForCharacter)

router.use('/base', BaseHackCardsRouter)
router.use('/io', IOHackCardsRouter)
router.use('/modifier', ModifierHackCardsRouter);
router.use("/protocol", ProtocolHackCardsRouter)

export default router;