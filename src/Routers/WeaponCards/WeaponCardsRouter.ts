import {Router} from 'express'
import BaseWeaponCardsRouter from "./BaseWeaponCardsRouter";
import FormWeaponCardsRouter from "./FormWeaponCardsRouter";
import SkillWeaponCardsRouter from "./SkillWeaponCardsRouter";
import {
    GetAllSpellsPossibleForUser, GetAllSpellsPreparedForCharacter,
    GetAllWeaponCards,
    GetAllWeaponsPossibleForUser, GetAllWeaponsPreparedForCharacter
} from "../../Controllers/GetCardDataController";

const router = Router();

router.get('/getAll', GetAllWeaponCards)
router.get("/getPossible/:characterId", GetAllWeaponsPossibleForUser)

router.get("/getPrepared/:characterId", GetAllWeaponsPreparedForCharacter)

router.use("/base", BaseWeaponCardsRouter)
router.use("/form", FormWeaponCardsRouter)
router.use("/skill", SkillWeaponCardsRouter);

export default router;