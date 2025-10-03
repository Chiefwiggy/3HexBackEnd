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
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import IOTechnikCardModel from "../Models/Cards/IOTechnikCardModel";
import BaseTechnikCardModel from "../Models/Cards/BaseTechnikCardModel";
import ModifierTechnikCardModel from "../Models/Cards/ModifierTechnikCardModel";
import ProtocolTechnikCardModel from "../Models/Cards/ProtocolTechnikCardModel";

export const AddBaseSpell = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddSpellCard(req, res, "base", BaseSpellCardModel);
    })
    .exec();

export const AddTargetSpell = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddSpellCard(req, res, "target", TargetSpellCardModel);
    })
    .exec();

export const AddSummonTargetSpell = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddSpellCard(req, res, "summon", TargetSpellCardModel);
    })
    .exec();

export const AddModifierSpell = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddSpellCard(req, res, "skill", ModifierSpellCardModel);
    })
    .exec();

export const AddEdictSpell = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddSpellCard(req, res, "edict", ModifierSpellCardModel);
    })
    .exec();

export const AddBaseWeapon = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddWeaponCard(req, res, "base", BaseWeaponCardModel);
    })
    .exec();

export const AddWeaponForm = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddWeaponCard(req, res, "form", FormWeaponCardModel);
    })
    .exec();

export const AddWeaponOrder = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddWeaponCard(req, res, "order", SkillWeaponCardModel);
    })
    .exec();

export const AddWeaponSkill = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddWeaponCard(req, res, "skill", SkillWeaponCardModel);
    })
    .exec();

export const AddConditionCard = new ValidQueryBuilder()
    .admin()
    .success(async (req: Request, res: Response, user: _IUserModel) => {
        return _AddCard(
            req,
            res,
            "condition",
            (req.body as _IConditionCard).cardSubtype,
            ConditionCardModel
        );
    })
    .exec();

export const AddHackIO = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        return _AddHackCard(req, res, "io", IOTechnikCardModel)
    })
    .exec();

export const AddHackFunction = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        return _AddHackCard(req, res, "function", BaseTechnikCardModel)
    })
    .exec();

export const AddHackProtocol = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        return _AddHackCard(req, res, "protocol", ProtocolTechnikCardModel);
    })
    .exec();

export const AddHackUtil = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        return _AddHackCard(req, res, "util", ModifierTechnikCardModel);
    })
    .exec();

export const AddHackElse = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        return _AddHackCard(req, res, "else", ModifierTechnikCardModel);
    })
    .exec();

const _AddWeaponCard = async(req: Request, res: Response, subtype: string, model: mongoose.Model<any>) => {
    return _AddCard(req, res, "weapon", subtype, model);
}

const _AddSpellCard = async(req: Request, res: Response, subtype: string, model: mongoose.Model<any>) => {
    return _AddCard(req, res, "spell", subtype, model);
}

const _AddHackCard = async(req: Request, res: Response, subtype: string, model: mongoose.Model<any>) => {
    return _AddCard(req, res, "hack", subtype, model);
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

