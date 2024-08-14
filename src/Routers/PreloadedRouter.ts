import {Router, Request, Response} from 'express'
import {_GetAllCardsOfCriteria, _GetCardsOfType, _GetFilteredCardsOfType} from "../Controllers/GetCardDataController";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import ArmorModel from "../Models/Equipment/ArmorModel";
import {_GetAllAbilitiesForCriteria} from "../Controllers/AbilityController";
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import {_ISpellCardData} from "../Models/Cards/AbstractSpellCardSchema";
import LawModel from "../Models/LawModel";
import SourceModel from "../Models/SourceModel";
import {_GetAllSources} from "../Controllers/SourceController";

const router = Router();

router.get("/getAllPreloadedContent", async(req: Request, res: Response) => {

    const classCards = await _GetAllCardsOfCriteria(req, res, "class");
    const affinityCards = await _GetAllCardsOfCriteria(req, res, "affinity");
    const arcanaCards = await _GetAllCardsOfCriteria(req, res, "arcana");

    const classAbilities = await _GetAllAbilitiesForCriteria(req, res, "class");
    const affinityAbilities = await _GetAllAbilitiesForCriteria(req, res, "affinity");
    const arcanaAbilities = await _GetAllAbilitiesForCriteria(req, res, "arcana");

    const allSources = await _GetAllSources(req, res);

    const weaponData = await _GetCardsOfType(req, res, BaseWeaponCardModel);
    const armorData = await ArmorModel.find({});

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
        arcana: {
            cards: arcanaCards.data,
            abilities: arcanaAbilities.data,
        },
        sources: allSources.data,
        weaponData: weaponData.data,
        armorData: armorData
    })


});

export default router;