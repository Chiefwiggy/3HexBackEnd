import {Router} from 'express'
import SpellCardsRouter from "./SpellCards/SpellCardsRouter";
import WeaponCardsRouter from "./WeaponCards/WeaponCardsRouter";
import HackCardsRouter from "./TechnikCards/HackCardsRouter";
import {
    GetAllCardsForAffinity, GetAllCardsForPath,
    GetAllCardsForClass,
    GetAllCardsForClasses,
    GetAllCardsPossibleForUser,
    GetAllCards, GetCardById, GetCardOrAbilityById, GetAllSourceCards
} from "../Controllers/GetCardDataController";
import CommanderCardRouter from "./CommanderCardRouter";
import ConditionCardRouter from "./ConditionCardRouter";

const router = Router();

router.get('/getAll', GetAllCards)

router.get('/getPlus/:cardId', GetCardOrAbilityById)
router.get("/getPossible/:characterId", GetAllCardsPossibleForUser);
router.get("/get/class/all", GetAllCardsForClasses)
router.get("/get/class/:className", GetAllCardsForClass)
router.get("/get/affinity/all", GetAllCardsForAffinity);
router.get('/get/path/all', GetAllCardsForPath);
router.get("/get/sourceCards", GetAllSourceCards);
router.get('/get/:cardId', GetCardById)

router.use('/spells', SpellCardsRouter);
router.use('/weapons', WeaponCardsRouter);
router.use('/commander', CommanderCardRouter)
router.use('/conditions', ConditionCardRouter);
router.use('/hacks', HackCardsRouter);

export default router;

