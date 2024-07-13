import {Router} from 'express'
import BaseSpellCardsRouter from "./BaseSpellCardsRouter";
import TargetSpellCardsRouter from "./TargetSpellCardsRouter";
import ModifierSpellCardsRouter from "./ModifierSpellCardsRouter";
import {
    GetAllSpells,
    GetAllSpellsPreparedForCharacter,
    GetAllSpellsPossibleForUser
} from "../../Controllers/GetCardDataController";

const router = Router();

router.get('/getAll', GetAllSpells)
router.get("/getValid/:characterId", () => {})
router.get("/getPossible/:characterId", GetAllSpellsPossibleForUser)

router.get("/getPrepared/:characterId", GetAllSpellsPreparedForCharacter)

router.use('/base', BaseSpellCardsRouter)
router.use('/target', TargetSpellCardsRouter)
router.use('/modifier', ModifierSpellCardsRouter);

export default router;