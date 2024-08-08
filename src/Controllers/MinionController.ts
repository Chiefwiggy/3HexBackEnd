import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from 'express'
import {_IUserModel} from "../Models/UserModel";
import validQueryBuilder from "../Utils/ValidQueryBuilder";
import CharacterModel, {_IPreparedCard} from "../Models/CharacterModel";
import MinionModel, {_IMinionSchema} from "../Models/MinionModel";
import BaseSpellCardModel, {_IBaseSpellCardData} from "../Models/Cards/BaseSpellCardModel";
import mongoose from "mongoose";
import {_IAbstractCardData} from "../Models/Generics/AbstractCardSchema";
import ArmorModel, {_IArmor} from "../Models/Equipment/ArmorModel";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import FormWeaponCardModel from "../Models/Cards/FormWeaponCardModel";
import SkillWeaponCardModel from "../Models/Cards/SkillWeaponCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import TargetSpellCardModel from "../Models/Cards/TargetSpellCardModel";


export const GetAllMinions = () => {

}

export const GetMinionsByIds = new validQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const ids = req.query.ids as string;
        if (!ids) {
            res.status(400).json({error: "No IDs provided"});
            return;
        }

        const idArray = ids.split(",");

        const finalCharacters = [];

        for (const id of idArray) {
            const mdata = await _GetMinionData(id);
            if (mdata) {
                finalCharacters.push(mdata);
            }
        }

        res.status(200).json(finalCharacters);
    })
    .exec();

export const CreateMinion = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new MinionModel({...req.body});
            await data.save();

            res.status(201).json({
               status: "success",
               data: {...data}
            });
        } catch (e) {
            res.status(400).json(e);
        }
    })
    .exec();

export interface _IMinionSchemaOutput extends _IMinionSchema {
    cardData: Array<_IAbstractCardData>
}
const _GetMinionData = async(minionId: string) => {
    const char: _IMinionSchema | null = await MinionModel.findById(minionId).lean();
    if (char) {
        let currentArmor = null;
        let cardList: Array<_IAbstractCardData> = [];
        if (char.currentWeapon) {
            if (!char.currentWeapon.weaponBaseData.baseId.startsWith("___")) {
                const baseCard = await BaseWeaponCardModel.findById(char.currentWeapon.weaponBaseData.baseId);
                if (baseCard) {
                    cardList.push(baseCard);
                }
            }
            for (const cardId of char.currentWeapon.weaponCardsIds) {
                if (!cardId.startsWith("___")) {
                    const form = await FormWeaponCardModel.findById(cardId);
                    if (!form) {
                        const skill = await SkillWeaponCardModel.findById(cardId);
                        if (skill) {
                            cardList.push(skill);
                        }
                    } else {
                        cardList.push(form);
                    }
                }
            }
        }


        if (char.currentSpell) {
            if (!char.currentSpell.spellBaseId.startsWith("___")) {
                const baseCard = await BaseSpellCardModel.findById(char.currentSpell.spellBaseId);
                if (baseCard) {
                    cardList.push(baseCard);
                }
            }
            if (!char.currentSpell.spellTargetId.startsWith("___")) {
                const targetCard = await TargetSpellCardModel.findById(char.currentSpell.spellTargetId);
                if (targetCard) {
                    cardList.push(targetCard);
                }
            }
            for (const cardId of char.currentSpell.spellSkillsIds) {
                if (!cardId.startsWith("___")) {
                    const skillCard = await ModifierSpellCardModel.findById(cardId);
                    if (skillCard) {
                        // @ts-ignore
                        cardList.push(skillCard);
                    }
                }
            }
        }

        const newChar: _IMinionSchemaOutput = {
            ...char,
            cardData: cardList
        }
        return newChar;
    }
    return undefined;
}

export const UpdateMinion = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const existingChar = await MinionModel.findById(req.query.id);
            if (!existingChar) {
                res.status(404).send("Could not find minion.")
                return;
            }
            await MinionModel.findByIdAndUpdate(
                req.query.id,
                { $set: req.body, $inc: {__v: 1}},
                { new: true, runValidators: true}
            )
            let message = { message: "Minion successfully updated" };
            res.status(202).json(message);
        } catch (e) {
            console.error(e)
            res.status(500).send(e)
        }

    })
    .exec();