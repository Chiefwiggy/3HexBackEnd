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

export const GetAllCardsForArcana = async(req: Request, res: Response) => {
    const finalStruct = await _GetAllCardsOfCriteria(req, res, "arcana")
    res.status(finalStruct.status).json(finalStruct.data);
}

export const GetAllCardsForAffinity = async(req: Request, res: Response) => {
    const finalStruct = await _GetAllCardsOfCriteria(req, res, "affinity")
    res.status(finalStruct.status).json(finalStruct.data);
}

export const _GetAllCardsOfCriteria = async(req: Request, res: Response, criteria: _UPrerequisiteType) => {
    try {
        const allSpells = await _GetAllSpellsHelper();
        const allWeapons = await _GetAllWeaponsHelper();
        const allCommanderCards = await CommanderCardModel.find({});

        const allCards = [...allSpells.bases, ...allSpells.targets, ...allSpells.modifiers, ...allWeapons.bases, ...allWeapons.forms, ...allWeapons.skills, ...allCommanderCards];

        const finalCards: { [key: string]: any[] } = {};

        allCards.forEach(card => {
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
        const {arcana} = _CalcAffinities(char);


        if (char.knownSources.length > 0) {
            const sourceIds = (await Promise.all(char.knownSources.map(async (sourceMetadata) => {
                const sourceData: _ISourceSchema | null = await SourceModel.findById(sourceMetadata.sourceId);
                if (sourceData) {
                    return sourceData.sourceTiers.flatMap(tier => {
                        return (sourceMetadata.attunementLevel >= tier.layer && arcana["arcane"] >= tier.arcaneRequirement) ? tier.cardId : null
                    }).filter(e => e);
                }
                return [];
            }))).flat();

            console.log(sourceIds);


            const newBases = allCards.bases.filter((base) => {
                // @ts-ignore
                return sourceIds.includes(base._id.toString());
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
        } else {
            return {
                bases: [],
                targets: _PossibleFilter(allCards.targets, char),
                modifiers: _PossibleFilter(allCards.modifiers, char, true)
            }
        }
    }
}

const _GetAllWeaponsPossibleForUser = async(user: _IUserModel, characterId: string) => {
    const char: _ICharacterData | null = await CharacterModel.findById(characterId);
    if (char) {
        const allCards = await _GetAllWeaponsHelper();
        const newWeapons = allCards.bases.filter((base) => {

            return base.prerequisites.reduce((pv, prerequisite) => {
                if (pv) return pv
                if (prerequisite.prerequisiteType === "class" || prerequisite.prerequisiteType === "affinity" || prerequisite.prerequisiteType === "arcana") {
                    return true;
                }
                return pv;
            }, false)

        })
        return {
            bases:  _PossibleFilter(newWeapons, char),
            forms:  _PossibleFilter(allCards.forms, char),
            skills:  _PossibleFilter(allCards.skills, char)
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
    const {affinities, arcana} = _CalcAffinities(character);
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
                    return character.classes.filter(cc => cc.className.toLowerCase() == cv.skill.toLowerCase()).length > 0
                case "arcana":
                    // console.log(arcana[cv.skill as "arcane" | "warrior" | "support" | "hacker"], cv.level)
                    return arcana[cv.skill as "arcane" | "warrior" | "support" | "hacker"] >= cv.level;
                case "nodefault":
                    return excludeNoDefault ? false : pv;
                case "fateline":
                    return (character.fateline.fatelineName === cv.skill && (cv.level === -1) === character.fateline.isReversed)
                case "race":
                    return false;
                default:
                    return pv;
            }
        }, true);
    })
}

export const _CalcAffinities = (character: _ICharacterData) => {
    const affinities: _IAffinities = {
        abjuration: 0,
        biohacking: 0,
        deft: 0,
        erudite: 0,
        guardian: 0,
        focus: 0,
        infantry: 0,
        leadership: 0,
        machinery: 0,
        rune: 0,
        soul: 0,
        supply: 0
    }
    character.classes.forEach((char) => {
        Object.entries(char.affinities).forEach(([key, value]) => {
            affinities[key as keyof _IAffinities] += value;
        })
    })
    const arcana = {
        arcane: affinities.focus + affinities.soul + affinities.soul,
        warrior: affinities.deft + affinities.infantry + affinities.guardian,
        support: affinities.supply + affinities.leadership + affinities.erudite,
        hacker: affinities.biohacking + affinities.abjuration + affinities.machinery
    }
    return {
        affinities,
        arcana
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

