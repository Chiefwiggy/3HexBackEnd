import {Request, Response} from 'express';
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import TargetSpellCardModel from "../Models/Cards/TargetSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import mongoose from "mongoose";
import FormWeaponCardModel from "../Models/Cards/FormWeaponCardModel";
import SkillWeaponCardModel from "../Models/Cards/SkillWeaponCardModel";
import ConditionCardModel, {_IConditionCard} from "../Models/Cards/ConditionCardModel";
import {UpdateCacheInternal} from "./CacheController";

export const AddBaseSpell = async (req: Request, res: Response) => {
    return _AddSpellCard(req, res, "base", BaseSpellCardModel)
}

export const AddTargetSpell = async (req: Request, res: Response) => {
    return _AddSpellCard(req, res, "target", TargetSpellCardModel)
}

export const AddSummonTargetSpell = async (req: Request, res: Response) => {
    return _AddSpellCard(req, res, "summon", TargetSpellCardModel)
}

export const AddModifierSpell = async(req: Request, res: Response) => {
    return _AddSpellCard(req, res, "skill", ModifierSpellCardModel);
}


export const AddEdictSpell = async(req: Request, res: Response) => {
    return _AddSpellCard(req, res, "edict", ModifierSpellCardModel);
}

export const AddBaseWeapon = async(req: Request, res: Response) => {
    return _AddWeaponCard(req, res, "base", BaseWeaponCardModel)
}

export const AddWeaponForm = async(req: Request, res: Response) => {
    return _AddWeaponCard(req, res, "form", FormWeaponCardModel);
}

export const AddWeaponOrder = async(req: Request, res: Response) => {
    return _AddWeaponCard(req, res, "order", SkillWeaponCardModel);
}

export const AddWeaponSkill = async(req: Request, res: Response) => {
    return _AddWeaponCard(req, res, "skill", SkillWeaponCardModel)
}

export const AddConditionCard = async(req: Request, res: Response) => {
    return _AddCard(req, res, "condition", ((req.body) as _IConditionCard).cardSubtype, ConditionCardModel);
}

const _AddWeaponCard = async(req: Request, res: Response, subtype: string, model: mongoose.Model<any>) => {
    return _AddCard(req, res, "weapon", subtype, model);
}

const _AddSpellCard = async(req: Request, res: Response, subtype: string, model: mongoose.Model<any>) => {
    return _AddCard(req, res, "spell", subtype, model);
}

const _AddCard = async(req: Request, res: Response, type: string, subtype: string, model: mongoose.Model<any>) => {
    try {
        const result = new model({...req.body, cardType: type, cardSubtype: subtype})
        await result.save();
        await UpdateCacheInternal([`cards`], false)
        res.status(201).json({
            status: "success",
            data: {...result}
        })
    } catch (err) {
        res.status(401).send(err);
    }
}

