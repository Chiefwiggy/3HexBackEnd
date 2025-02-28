import {Router, Request, Response} from 'express'
import {
    _GetAllCardsOfCriteria,
    _GetCardsOfType,
    _GetFilteredCardsOfType,
    GetAllConditionCards
} from "../Controllers/GetCardDataController";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import ArmorModel from "../Models/Equipment/ArmorModel";
import {_GetAllAbilitiesForCriteria} from "../Controllers/AbilityController";
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import {_ISpellCardData} from "../Models/Cards/AbstractSpellCardSchema";
import LawModel from "../Models/LawModel";
import SourceModel from "../Models/SourceModel";
import {_GetAllSources} from "../Controllers/SourceController";
import ConsumableModel from "../Models/Equipment/ConsumableModel";
import {GetFatelineData} from "../Controllers/FatelineController";
import ConditionCardModel from "../Models/Cards/ConditionCardModel";
import DowntimeActivityModel from "../Models/DowntimeActivityModel";
import ShieldModel from "../Models/Equipment/ShieldModel";
import {GetAllConditions} from "../Controllers/ConditionController";
import ConditionModel from "../Models/ConditionModel";

const router = Router();

router.get("/getAllPreloadedContent", async(req: Request, res: Response) => {

    const classCards = await _GetAllCardsOfCriteria(req, res, "class");
    const affinityCards = await _GetAllCardsOfCriteria(req, res, "affinity");
    const pathCards = await _GetAllCardsOfCriteria(req, res, "path");

    const classAbilities = await _GetAllAbilitiesForCriteria(req, res, "class");
    const affinityAbilities = await _GetAllAbilitiesForCriteria(req, res, "affinity");
    const pathAbilities = await _GetAllAbilitiesForCriteria(req, res, "path");

    const allSources = await _GetAllSources(req, res);

    const weaponData = await _GetCardsOfType(req, res, BaseWeaponCardModel);
    const armorData = await ArmorModel.find({});
    const shieldData = await ShieldModel.find({});

    const consumableData = await ConsumableModel.find({});

    const fatelineData = await GetFatelineData(req, res);

    const conditionCards = await ConditionCardModel.find({});

    const downtime = await DowntimeActivityModel.find({});

    const conditions = await ConditionModel.find({});

    res.status(200).json({
        class: {
            cards: classCards.data,
            abilities: classAbilities.data,
            meta: null
        },
        affinity: {
            cards: affinityCards.data,
            abilities: affinityAbilities.data,
        },
        path: {
            cards: pathCards.data,
            abilities: pathAbilities.data,
        },
        sources: allSources.data,
        weaponData: weaponData.data,
        armorData: armorData,
        shieldData: shieldData,
        consumableData: consumableData,
        fatelineData: fatelineData,
        conditionCards: conditionCards,
        downtimeActivitiesData: downtime,
        conditionTags: conditions
    })


});

export default router;