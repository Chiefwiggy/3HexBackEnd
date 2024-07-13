import {Router} from 'express'
import {
    AddAbility, GetAbilitiesForAllAffinities, GetAbilitiesForAllArcana,
    GetAbilitiesForAllClasses,
    GetAbilitiesForChar,
    GetAbilitiesForClass
} from "../Controllers/AbilityController";

const router = Router();

router.post("/add", AddAbility)
router.get("/getPossible/:characterId", GetAbilitiesForChar)
router.get("/get/class/all", GetAbilitiesForAllClasses)
router.get("/get/class/:className", GetAbilitiesForClass)
router.get("/get/arcana/all", GetAbilitiesForAllArcana);
router.get("/get/affinity/all", GetAbilitiesForAllAffinities);


export default router;