import {Router} from 'express'
import SpellCardsRouter from "./SpellCards/SpellCardsRouter";
import WeaponCardsRouter from "./WeaponCards/WeaponCardsRouter";
import {
    GetAllCardsForAffinity, GetAllCardsForArcana,
    GetAllCardsForClass,
    GetAllCardsForClasses,
    GetAllCardsPossibleForUser
} from "../Controllers/GetCardDataController";
import CommanderCardRouter from "./CommanderCardRouter";
import ConditionCardRouter from "./ConditionCardRouter";

const router = Router();

router.get('/getAll', () => {})
router.get("/getPossible/:characterId", GetAllCardsPossibleForUser);
router.get("/get/class/all", GetAllCardsForClasses)
router.get("/get/class/:className", GetAllCardsForClass)
router.get("/get/affinity/all", GetAllCardsForAffinity);
router.get('/get/arcana/all', GetAllCardsForArcana);

router.use('/spells', SpellCardsRouter);
router.use('/weapons', WeaponCardsRouter);
router.use('/commander', CommanderCardRouter)
router.use('/conditions', ConditionCardRouter);

export default router;

