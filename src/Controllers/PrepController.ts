import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import {Request, Response} from 'express'
import CharacterModel, {_ICharacterData} from "../Models/CharacterModel";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import FormWeaponCardModel from "../Models/Cards/FormWeaponCardModel";
import TargetSpellCardModel from "../Models/Cards/TargetSpellCardModel";
import SkillWeaponCardModel from "../Models/Cards/SkillWeaponCardModel";
import {deepEqual} from "../Utils/generic";


export const GetAllWeaponsPrepared = new ValidQueryBuilder()
    .addPerm("registered")
    .success( async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const char: _ICharacterData | null = await CharacterModel.findById(req.params["characterId"]);

            if (char) {
                const ids = char.createdWeapons.reduce((pv: Array<string>, cv) => {
                    return [cv.weaponBaseData.baseId, ...cv.weaponCardsIds, ...pv]
                }, [])

                const bases = await BaseWeaponCardModel.find({
                    _id: {$in: ids}
                });
                const forms = await FormWeaponCardModel.find({
                    _id: {$in: ids}
                })
                const skills = await SkillWeaponCardModel.find({
                    _id: {$in: ids}
                })
                res.status(200).json({
                    bases,
                    forms,
                    skills
                })
            } else {
                res.status(404).send("womp womp");
            }
        } catch(e) {
            res.status(500).json(e);
        }
    })
    .exec();

export const AddPreparedWeapon = new ValidQueryBuilder()
    .addPerm("registered")
    .success( async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const char = await CharacterModel.findById(req.params["characterId"])
            if (char) {
                const {weaponBaseData, weaponCardsIds, customName} = req.body;
                if (!weaponBaseData || !weaponCardsIds) {
                    res.status(401).send("Invalid body.");
                    return;
                }
                const data = {
                    weaponBaseData,
                    weaponCardsIds,
                }

                if (char.createdWeapons.filter(entry => {
                    if (entry.weaponBaseData.baseId != data.weaponBaseData.baseId) {
                        return false;
                    }
                    if (entry.weaponCardsIds.length !== data.weaponCardsIds.length) {
                        return false;
                    }
                    entry.weaponCardsIds.forEach(e => {
                       if (!data.weaponCardsIds.includes(e)) {
                           return false;
                       }
                    });
                    return true;
                }).length != 0) {
                    res.status(208).send("Element already exists.");
                    return;
                }

                char.createdWeapons.push(req.body);
                await char.save();
                res.status(201).json({
                    message: "Successfully updated.",
                    char
                })
            } else {
                res.status(404).send("Could not find character.");
            }
        } catch(e) {
            res.status(500).json(e);
        }
    })
    .exec();

export const AddPreparedSpell = new ValidQueryBuilder()
    .addPerm("registered")
    .success( async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const char = await CharacterModel.findById(req.params["characterId"])
            if (char) {
                const {spellBaseId, spellTargetId, spellSkillsIds} = req.body;
                if (!spellBaseId || !spellTargetId || !spellSkillsIds) {
                    res.status(401).send("Invalid body.");
                    return;
                }
                const data = {
                    spellBaseId,
                    spellTargetId,
                    spellSkillsIds
                }

                if (char.createdSpells.filter(entry => {
                    if (entry.spellBaseId != data.spellBaseId) {
                        return false;
                    }
                    if (entry.spellTargetId != data.spellTargetId) {
                        return false;
                    }
                    if (entry.spellSkillsIds.length !== data.spellSkillsIds.length) {
                        return false;
                    }
                    entry.spellSkillsIds.forEach(e => {
                       if (!data.spellSkillsIds.includes(e)) {
                           return false;
                       }
                    });
                    return true;
                }).length != 0) {
                    res.status(208).send("Element already exists.");
                    return;
                }

                char.createdSpells.push(req.body);
                char.save();
                res.status(201).json({
                    message: "Successfully updated.",
                    char
                })
            } else {
                res.status(404).send("Could not find character.");
            }
        } catch(e) {
            res.status(500).json(e);
        }
    })
    .exec();
