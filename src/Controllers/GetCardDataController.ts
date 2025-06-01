import {Request, Response} from "express";
import BaseSpellCardModel, {_IBaseSpellCardData} from "../Models/Cards/BaseSpellCardModel";
import TargetSpellCardModel, {_ITargetSpellCardData} from "../Models/Cards/TargetSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import mongoose from "mongoose";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import FormWeaponCardModel from "../Models/Cards/FormWeaponCardModel";
import SkillWeaponCardModel from "../Models/Cards/SkillWeaponCardModel";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import CharacterModel, {
    _IAffinities,
    _IAttributes,
    _ICharacterData,
    _IKnownWeaponStruct, _IPreparedSource
} from "../Models/CharacterModel";
import {_ISpellCardData} from "../Models/Cards/AbstractSpellCardSchema";
import {_IAbstractCardData} from "../Models/Generics/AbstractCardSchema";
import CommanderCardModel from "../Models/Cards/CommanderCardModel";
import {_UPrerequisiteType} from "../Enums/CardEnums";
import SourceModel, {_ISourceSchema} from "../Models/SourceModel";
import ConditionCardModel from "../Models/Cards/ConditionCardModel";

export const GetAllSpellBases = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, BaseSpellCardModel);
    res.status(finalData.status).json(finalData.data);
}

export const GetAllSpellTargets = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, TargetSpellCardModel)
    res.status(finalData.status).json(finalData.data);
}

export const GetAllSpellModifiers = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, ModifierSpellCardModel)
    res.status(finalData.status).json(finalData.data);
}

export const GetAllWeaponBases = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, BaseWeaponCardModel);
    res.status(finalData.status).json(finalData.data);
}

export const GetAllWeaponForms = async(req :Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, FormWeaponCardModel)
    res.status(finalData.status).json(finalData.data);
}

export const GetAllWeaponSkills = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, SkillWeaponCardModel);
    res.status(finalData.status).json(finalData.data);
}

export const GetAllConditionCards = async(req: Request, res: Response) => {
    const finalData = await _GetCardsOfType(req, res, ConditionCardModel)
    res.status(finalData.status).json(finalData.data);
}

export const _GetFilteredCardsOfType = async (req: Request, res: Response, model: mongoose.Model<any>, filter: (e: any) => boolean) => {
    const allCardsOfType = await _GetCardsOfType(req, res, model);

    if (Array.isArray(allCardsOfType.data)) {
        return {
            status: allCardsOfType.status,
            data: allCardsOfType.data.filter(filter)
        }
    } else {
        return allCardsOfType;
    }

}

export const _GetCardsOfType = async(req: Request, res: Response, model: mongoose.Model<any>)  => {
    try {
        const result = await model.find({})
        return {
            status: 200,
            data: result
        }
    } catch (err) {
        return {
            status: 404,
            data: {
                err,
                message: "Could not find anything..."
            }
        }
    }
}

export const GetAllSpells = async(req: Request, res: Response) => {
    try {
        res.status(200).json(_GetAllSpellsHelper());
    } catch (err) {
        res.status(404).send("Couldn't find anything...");
    }
}

const _GetAllSpellsHelper = async() => {
    const bases: (_IBaseSpellCardData & mongoose.Document)[] | null = await BaseSpellCardModel.find({});
    const targets: (_ITargetSpellCardData & mongoose.Document)[] | null = await TargetSpellCardModel.find({});
    const modifiers: (_ISpellCardData & mongoose.Document)[] | null = await ModifierSpellCardModel.find({});
    return {
        bases,
        targets,
        modifiers
    }
}

export const GetAllWeaponCards = async(req: Request, res: Response) => {
    try {
        res.status(200).json(_GetAllWeaponsHelper());
    } catch (err) {
        res.status(404).send("Couldn't find anything");
    }
}

const _GetAllWeaponsHelper = async() => {
    const bases = await BaseWeaponCardModel.find({});
    const forms = await FormWeaponCardModel.find({});
    const skills = await SkillWeaponCardModel.find({});
    return {
        bases,
        forms,
        skills
    }
}

export const GetAllSpellsPossibleForUser = new ValidQueryBuilder()
    .addPerm('registered')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        res.status(200).json(await _GetAllSpellsPossibleForUser(user, req.params["characterId"]));
    })
    .exec();

export const GetAllWeaponsPossibleForUser = new ValidQueryBuilder()
    .addPerm('registered')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        res.status(200).json(await _GetAllWeaponsPossibleForUser(user, req.params["characterId"]));
    })
    .exec();

export const GetAllCardsPossibleForUser = new ValidQueryBuilder()
    .addPerm('registered')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        res.status(200).json(await _GetAllCardsPossibleForUser(user, req.params["characterId"]));
    })
    .exec();

export const GetAllCardsForClass = async(req: Request, res: Response) => {
    try {
        const allSpells = await _GetAllSpellsHelper();
        const allWeapons = await _GetAllWeaponsHelper();
        const allCommanderCards = await CommanderCardModel.find({});

        const allCards = [...allSpells.bases, ...allSpells.targets, ...allSpells.modifiers, ...allWeapons.bases, ...allWeapons.forms, ...allWeapons.skills, ...allCommanderCards];

        const finalCards = allCards.filter(card => {
            return card.prerequisites.reduce((pv, cv) => {
                if (pv) return pv;
                if (cv.prerequisiteType == "class" && cv.skill == req.params["className"]) {
                    return true;
                }
                return pv;
            }, false)
        })

        res.status(200).json(finalCards);

    }
    catch(e) {
        res.status(500).json(e);
    }
}

export const GetAllCardsForClasses = async(req: Request, res: Response) => {
    const finalStruct = await _GetAllCardsOfCriteria(req, res, "class")
    res.status(finalStruct.status).json(finalStruct.data);
}

export const GetAllCardsForPath = async(req: Request, res: Response) => {
    const finalStruct = await _GetAllCardsOfCriteria(req, res, "path")
    res.status(finalStruct.status).json(finalStruct.data);
}

export const GetAllCardsForAffinity = async(req: Request, res: Response) => {
    const finalStruct = await _GetAllCardsOfCriteria(req, res, "affinity")
    res.status(finalStruct.status).json(finalStruct.data);
}

export const _GetAllCardsOfCriteria = async(req: Request, res: Response, criteria: _UPrerequisiteType, ignoreNoDefault = false) => {
    try {
        const allSpells = await _GetAllSpellsHelper();
        const allWeapons = await _GetAllWeaponsHelper();
        const allCommanderCards = await CommanderCardModel.find({});

        const allCards = [...allSpells.bases, ...allSpells.targets, ...allSpells.modifiers, ...allWeapons.bases, ...allWeapons.forms, ...allWeapons.skills, ...allCommanderCards];

        const finalCards: { [key: string]: any[] } = {};

        allCards.forEach(card => {

            const hasNoDefault = card.prerequisites.some(prerequisite => prerequisite.prerequisiteType === "nodefault");
            if (ignoreNoDefault && hasNoDefault) {
                return;
            }

            card.prerequisites.forEach((prerequisite) => {
                if (prerequisite.prerequisiteType === criteria) {
                    const skill = prerequisite.skill;
                    if (skill) {
                        if (finalCards[skill]) {
                            finalCards[skill].push(card);
                        } else {
                            finalCards[skill] = [card];
                        }
                    }
                }
            });
        })

        return {
            status: 200,
            data: finalCards
        }

    }
    catch(e) {
        return {
            status: 500,
            data: e
        }
    }
}

const _GetAllSpellsPossibleForUser = async(user: _IUserModel, characterId: string) => {
    const char: _ICharacterData | null = await CharacterModel.findById(characterId);
    if (char) {
        const allCards = await _GetAllSpellsHelper();
        const {path} = _CalcAffinities(char);


        // if (char.knownSources.length > 0 || char.temporarySources.length > 0) {
            const sourceIds = (await Promise.all(char.knownSources.map(async (sourceMetadata) => {
                const sourceData: _ISourceSchema | null = await SourceModel.findById(sourceMetadata.sourceId);
                if (sourceData) {
                    return sourceData.sourceTiers.flatMap(tier => {
                        return (!tier.isSecret || user.userPermissions.includes("admin") || user.userPermissions.includes(`spell_${tier.cardId}_src_${sourceMetadata.sourceId}`)) ? tier.cardId : null
                    }).filter(e => e);
                }
                return [];
            }))).flat();

            const tempIds = (await Promise.all(char.temporarySources.map(async (sourceMetadata) => {
                const sourceData: _ISourceSchema | null = await SourceModel.findById(sourceMetadata.sourceId);
                if (sourceData) {
                    return sourceData.sourceTiers.flatMap(tier => {
                        return tier.cardId
                    }).filter(e => e);
                }
                return [];
            }))).flat();


            const newBases = allCards.bases.filter((base) => {
                // @ts-ignore
                if (tempIds.includes(base._id.toString())) {
                    // @ts-ignore
                    base.isFromTemporarySource = true;
                }
                // @ts-ignore
                return [...sourceIds, ...tempIds].includes(base._id.toString()) || base.prerequisites.length > 0;
                // return char.knownBaseSpells.includes(base._id.toString());
            })

            const newMods = allCards.modifiers.filter((mod)  => {
                // @ts-ignore
                return !(mod.cardSubtype == "edict" && mod.prerequisites.length == 1 && mod.prerequisites[0].prerequisiteType == "nodefault") || sourceIds.includes(mod._id.toString())
            })

            return {
                bases: _PossibleFilter(newBases, char),
                targets: _PossibleFilter(allCards.targets, char),
                modifiers: _PossibleFilter(newMods, char)
            }
        // }
        // else {
        //     return {
        //         bases: [],
        //         targets: _PossibleFilter(allCards.targets, char),
        //         modifiers: _PossibleFilter(allCards.modifiers, char, true)
        //     }
        // }
    }
}

const _GetAllWeaponsPossibleForUser = async(user: _IUserModel, characterId: string) => {
    const char: _ICharacterData | null = await CharacterModel.findById(characterId);
    if (char) {
        const allCards = await _GetAllWeaponsHelper();
        const newWeapons = allCards.bases.filter((base) => {

            return base.prerequisites.reduce((pv, prerequisite) => {
                if (pv) return pv
                if (prerequisite.prerequisiteType === "class" || prerequisite.prerequisiteType === "affinity" || prerequisite.prerequisiteType === "path") {
                    return true;
                }
                if (prerequisite.prerequisiteType === "nodefault" && (user.userPermissions.includes(`weapon_${base._id}`) || user.userPermissions.includes("admin"))) {
                    return true;
                }
                return pv;
            }, false)

        })
        const sourceIds = (await Promise.all(char.knownSources.map(async (sourceMetadata) => {
                const sourceData: _ISourceSchema | null = await SourceModel.findById(sourceMetadata.sourceId);
                if (sourceData) {
                    return sourceData.sourceTiers.flatMap(tier => {
                        return (!tier.isSecret || user.userPermissions.includes("admin") || user.userPermissions.includes(`spell_${tier.cardId}_src_${sourceMetadata.sourceId}`)) ? tier.cardId : null
                    }).filter(e => e);
                }
                return [];
            }))).flat();
        const newSkills = allCards.skills.filter((mod)  => {
                // @ts-ignore
                return !(mod.cardSubtype == "order" && mod.prerequisites.length == 1 && mod.prerequisites[0].prerequisiteType == "nodefault") || sourceIds.includes(mod._id.toString())
            })
        return {
            bases:  _PossibleFilter(newWeapons, char),
            forms:  _PossibleFilter(allCards.forms, char),
            skills:  _PossibleFilter(newSkills, char)
        }
    } else {
        return {
            bases: [],
            forms: [],
            skills: []
        }
    }
}

const _GetAllCommanderCardsPossibleForUser = async(user: _IUserModel, characterId: string) => {

    const char: _ICharacterData | null = await CharacterModel.findById(characterId);
    if (char) {
        const allCards = await CommanderCardModel.find({});
        return _PossibleFilter(allCards, char);
    } else {
        return [];
    }
}

const _GetAllCardsPossibleForUser = async(user: _IUserModel, characterId: string)  => {
    return {
        spells: await _GetAllSpellsPossibleForUser(user, characterId),
        weapons: await _GetAllWeaponsPossibleForUser(user, characterId),
        commanderCards: await _GetAllCommanderCardsPossibleForUser(user, characterId)
    }
}

const _PossibleFilter = (cardList: Array<_IAbstractCardData>, character: _ICharacterData, excludeNoDefault=false) => {
    const {affinities, path} = _CalcAffinities(character);
    return cardList.filter((card) => {
        return card.prerequisites.reduce((pv, cv) => {
            if (!pv) return false;
            switch(cv.prerequisiteType) {
                case "attribute":
                    // console.log(character.characterStats[cv.skill as keyof _IAttributes].value)
                    return character.characterStats[cv.skill as keyof _IAttributes].value >= cv.level;
                case "affinity":
                    // console.log(affinities[cv.skill as keyof _IAffinities])
                    return affinities[cv.skill as keyof _IAffinities] >= cv.level;
                case "class":
                    const clz = character.classes.find(cc => cc.className.split(" ").join("_").toLowerCase() == cv.skill.toLowerCase())
                    if (clz) {
                        if (cv.level == 1) {
                            return true;
                        } else {
                            return clz.isPromoted;
                        }
                    }
                    return false;
                case "path":
                    // console.log(path[cv.skill as "arcane" | "warrior" | "support" | "hacker"], cv.level)
                    return path[cv.skill as "arcanist" | "warrior" | "commander" | "navigator" | "scholar" | "hacker"] >= cv.level;
                case "nodefault":
                    return excludeNoDefault ? false : pv;
                case "fateline":
                    return character.fateline ? (character.fateline.fatelineId === cv.skill && (cv.level === -1) === character.fateline.isReversed) : false
                case "race":
                    if (cv.level == 1) {
                        return character.race.raceId === cv.skill;
                    } else {
                        return character.race.pointsSpentOn.includes(card._id)
                    }
                case "race_role":
                    if (cv.level == 1) {
                        return character.race.raceRoles.includes(cv.skill);
                    }
                    else {
                        return character.race.pointsSpentOn.includes(card._id)
                    }
                case "subrace":
                    if (cv.level == 1) {
                        return character.race.subraceId === cv.skill;
                    } else {
                        return character.race.pointsSpentOn.includes(card._id)
                    }
                default:
                    return pv;
            }
        }, true);
    })
}

export const _CalcAffinities = (character: _ICharacterData) => {
    const affinities: _IAffinities = {
        nimble: 0,
        infantry: 0,
        guardian: 0,
        focus: 0,
        creation: 0,
        alteration: 0,
        leadership: 0,
        supply: 0,
        summoning: 0,
        swift: 0,
        riding: 0,
        adaptation: 0,
        rune: 0,
        sourcecraft: 0,
        research: 0,
        machinery: 0,
        abjuration: 0,
        biohacking: 0
    }
    character.classes.forEach((char) => {
        Object.entries(char.affinities).forEach(([key, value]) => {
            affinities[key as keyof _IAffinities] += value;
        })
    })
    if (character.fateline) {
        Object.entries(character.fateline.affinities).forEach(([key, value]) => {
            affinities[key as keyof _IAffinities] += value;
        })
    }
    const path = {
        warrior: affinities.nimble + affinities.infantry + affinities.guardian,
        arcanist: affinities.focus + affinities.creation + affinities.alteration,
        commander: affinities.leadership + affinities.supply + affinities.summoning,
        navigator: affinities.swift + affinities.riding + affinities.adaptation,
        scholar: affinities.rune + affinities.research + affinities.sourcecraft,
        hacker: affinities.abjuration + affinities.machinery + affinities.biohacking
    }
    return {
        affinities,
        path
    }
}

export const GetAllSpellsPreparedForCharacter = new ValidQueryBuilder()
    .addPerm('registered')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const spellData = await _GetAllSpellsHelper();
        const allSpells = [...spellData.bases, ...spellData.modifiers, ...spellData.targets]
        await _GetPreparedCardsFromList(req, res, allSpells, "knownBaseSpells")
    })
    .exec();

export const GetAllWeaponsPreparedForCharacter = new ValidQueryBuilder()
    .addPerm('registered')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const weaponData = await _GetAllWeaponsHelper();
        const allSpells = [...weaponData.bases, ...weaponData.forms, ...weaponData.skills];
        await _GetPreparedCardsFromList(req, res, allSpells, "knownWeapons")
    })
    .exec();

const _GetPreparedCardsFromList = async(req: Request, res: Response, cardList: Array<_IAbstractCardData>, prepIndex: string) => {
    try {
        const char: _ICharacterData | null = await CharacterModel.findById(req.params["characterId"]);
        if (!char) {
            res.status(404).send("Could not find character.");
        } else {
            const newCards = cardList.filter((c) => {

                if (prepIndex === "knownWeapons") {
                    return [...char.preparedCards, ...((char[prepIndex] as Array<_IKnownWeaponStruct>).map(e => e.baseId))].includes((c as any)._id.toString());
                } else {
                    // @ts-ignore
                    return [...char.preparedCards, ...char[prepIndex]].includes(c._id.toString());
                }

            })
            res.status(200).json(newCards);
        }
    } catch (e) {
        res.status(500).json(e);
    }
}

