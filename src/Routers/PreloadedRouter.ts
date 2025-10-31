import {Router, Request, Response} from 'express'
import {
    _GetAllCardsOfCriteria,
    _GetCardsOfType
} from "../Controllers/GetCardDataController";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import ArmorModel from "../Models/Equipment/ArmorModel";
import {_GetAllAbilitiesForCriteria} from "../Controllers/AbilityController";
import {_GetAllSources} from "../Controllers/SourceController";
import ConsumableModel from "../Models/Equipment/ConsumableModel";
import {GetFatelineData} from "../Controllers/FatelineController";
import ConditionCardModel, {_IConditionCard} from "../Models/Cards/ConditionCardModel";
import DowntimeActivityModel from "../Models/DowntimeActivityModel";
import ShieldModel from "../Models/Equipment/ShieldModel";
import {GetAllConditions} from "../Controllers/ConditionController";
import ConditionModel from "../Models/ConditionModel";
import MountBaseModel from "../Models/MountBaseModel";
import MinionRoleModel from "../Models/MinionRoleModel";
import MinionModel from "../Models/MinionModel";
import MinionModel_New from "../Models/MinionModel_New";
import {GetMinionData} from "../Controllers/MinionController";
import {Document} from "mongoose"
import RaceModel from "../Models/RaceModel";
import CachingModel, {_ICachingModel} from "../Models/CachingModel";
import SourceModel, {_ISourceSchema} from "../Models/SourceModel";
import {_IDatachipSchema} from "../Models/DatachipModel";
import {_GetAllDatachips} from "../Controllers/DatachipController";
import {_IPackageSchema} from "../Models/PackageModel";
import {_GetAllPackages} from "../Controllers/PackageController";

const router = Router();

const doesUserNeedNewestBatch = (db_name: string, userCache: _ICachingModel, masterCache: _ICachingModel | null) => {
    if (masterCache) {
        const master_data = masterCache.db_cache_timestamps.find(e => e.entry_name == db_name)
        const user_data = userCache.db_cache_timestamps.find(e => e.entry_name == db_name)
        if (master_data && user_data) {
            return (new Date(master_data.last_updated) > new Date(user_data.last_updated))
        } else {
            return true;
        }
    } else {
        return true
    }
}

router.post("/getAllPreloadedContent", async(req: Request, res: Response) => {

    const userCacheData = req.body.user_cache_data;
    let universal_override = false;
    let masterCache: _ICachingModel | null = null

    if (!userCacheData || Object.keys(userCacheData).length == 0) {
        universal_override = true;
    }
    const t_masterCache = await CachingModel.find({is_master: true})
    if (t_masterCache) {
        // @ts-ignore
        masterCache = t_masterCache[0] as _ICachingModel;
    }

    // --- CARDS ---
    let classCards: any = {data: {}}
    let affinityCards: any = {data: {}}
    let pathCards: any = {data: {}}
    let raceCards = []
    let subraceCards = []
    let raceRoleCards = []
    let developmentCards = []
    let conditionCards: Array<_IConditionCard> = []
    let weaponData: any = [];

    if (universal_override || doesUserNeedNewestBatch("cards", userCacheData, masterCache)) {
        classCards = await _GetAllCardsOfCriteria(req, res, "class");
        affinityCards = await _GetAllCardsOfCriteria(req, res, "affinity");
        pathCards = await _GetAllCardsOfCriteria(req, res, "path");

        weaponData = (await _GetCardsOfType(req, res, BaseWeaponCardModel)).data as any;

        raceCards = (await _GetAllCardsOfCriteria(req, res, "race", true)).data as any
        subraceCards = (await _GetAllCardsOfCriteria(req, res, "subrace", true)).data as any
        raceRoleCards = (await _GetAllCardsOfCriteria(req, res, "race_role", true)).data as any

        developmentCards = (await _GetAllCardsOfCriteria(req, res, "development", true)).data as any

        conditionCards = await ConditionCardModel.find({});
    }



    // --- ABILITIES ---

    let raceAbilities: any = {}
    let subraceAbilities: any = {}
    let raceRoleAbilities: any = {}
    let developmentAbilities: any = {}
    let classAbilities: any = {data: {}}
    let affinityAbilities: any = {data: {}}
    let pathAbilities: any = {data: {}}

    if (universal_override || doesUserNeedNewestBatch("abilities", userCacheData, masterCache)) {
        console.log("got here")
        raceAbilities = (await _GetAllAbilitiesForCriteria(req, res, "race")).data;
        subraceAbilities = (await _GetAllAbilitiesForCriteria(req, res, "subrace")).data;
        raceRoleAbilities = (await _GetAllAbilitiesForCriteria(req, res, "race_role")).data;

        developmentAbilities = (await _GetAllAbilitiesForCriteria(req, res, "development")).data;

        classAbilities = await _GetAllAbilitiesForCriteria(req, res, "class");
        affinityAbilities = await _GetAllAbilitiesForCriteria(req, res, "affinity");
        pathAbilities = await _GetAllAbilitiesForCriteria(req, res, "path");
    }



    // --- OTHER ---
    let raceMetadata: any = {}

    if (universal_override || doesUserNeedNewestBatch("races", userCacheData, masterCache)) {
        raceMetadata = await RaceModel.find({});
    }

    let allSources: Array<_ISourceSchema> = []

    if (universal_override || doesUserNeedNewestBatch("sources", userCacheData, masterCache)) {
        allSources = (await _GetAllSources(req, res)).data as Array<_ISourceSchema>;
    }


    let armorData: any = [];
    let shieldData: any = [];
    let consumableData: any = [];
    let fatelineData: any = [];
    let downtime: any = [];
    let conditions: any = [];
    let mounts: any = [];

    if (universal_override || doesUserNeedNewestBatch("armors", userCacheData, masterCache)) {
        armorData = await ArmorModel.find({});
    }

    if (universal_override || doesUserNeedNewestBatch("shields", userCacheData, masterCache)) {
        shieldData = await ShieldModel.find({});
    }

    if (universal_override || doesUserNeedNewestBatch("consumables", userCacheData, masterCache)) {
        consumableData = await ConsumableModel.find({});
    }

    if (universal_override || doesUserNeedNewestBatch("fatelines", userCacheData, masterCache)) {
        fatelineData = await GetFatelineData(req, res);
    }

    if (universal_override || doesUserNeedNewestBatch("downtime_activities", userCacheData, masterCache)) {
        downtime = await DowntimeActivityModel.find({});
    }

    if (universal_override || doesUserNeedNewestBatch("conditions", userCacheData, masterCache)) {
        conditions = await ConditionModel.find({});
    }

    if (universal_override || doesUserNeedNewestBatch("mounts", userCacheData, masterCache)) {
        mounts = await MountBaseModel.find({});
    }

    const minionRoles = await MinionRoleModel.find({});
    const allMinions = await MinionModel_New.find({});


    const allMinionsPlusData = await Promise.all(

        allMinions.map((e: Document) => {
            return GetMinionData(e._id as string);
        })
    )

    let allDatachips :Array<_IDatachipSchema> = [];
    if (universal_override || doesUserNeedNewestBatch("datachips", userCacheData, masterCache)) {
        allDatachips = (await _GetAllDatachips(req, res)).data as Array<_IDatachipSchema>;
    }

    let allPackages: Array<_IPackageSchema> = []
    if (universal_override || doesUserNeedNewestBatch("packages", userCacheData, masterCache)) {
        allPackages = (await _GetAllPackages(req, res)).data as Array<_IPackageSchema>;
    }

    res.status(200).json({
        updatedCache: masterCache,
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
        sources: allSources,
        datachips: allDatachips,
        packages: allPackages,
        weaponData: weaponData,
        armorData: armorData,
        shieldData: shieldData,
        consumableData: consumableData,
        fatelineData: fatelineData,
        conditionCards: conditionCards,
        downtimeActivitiesData: downtime,
        conditionTags: conditions,
        mountData: mounts,
        minionRoles: minionRoles,
        allMinions: allMinionsPlusData,
        raceData: {
            raceCards,
            subraceCards,
            raceRoleCards,
            raceAbilities,
            subraceAbilities,
            raceRoleAbilities,
            raceMetadata
        },
        development: {
            abilities: developmentAbilities,
            cards: developmentCards
        }
    })


});

export default router;