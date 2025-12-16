import {Request, Response} from 'express';
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import mongoose from "mongoose";
import TargetSpellCardModel from "../Models/Cards/TargetSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import BaseWeaponCardModel from "../Models/Cards/BaseWeaponCardModel";
import FormWeaponCardModel from "../Models/Cards/FormWeaponCardModel";
import SkillWeaponCardModel from "../Models/Cards/SkillWeaponCardModel";
import BaseHackCardsRouter from "../Routers/TechnikCards/BaseHackCardsRouter";
import BaseTechnikCardModel from "../Models/Cards/BaseTechnikCardModel";
import IOTechnikCardModel from "../Models/Cards/IOTechnikCardModel";
import ProtocolTechnikCardModel from "../Models/Cards/ProtocolTechnikCardModel";
import ModifierTechnikCardModel from "../Models/Cards/ModifierTechnikCardModel";

export const EditBaseSpell = async(req: Request, res: Response) => {
    return _EditCard(req, res, BaseSpellCardModel);
}

export const EditTargetSpell = async(req: Request, res: Response) => {
    return _EditCard(req, res, TargetSpellCardModel);
}

export const EditModifierSpell = async(req: Request, res: Response) => {
    return _EditCard(req, res, ModifierSpellCardModel);
}

export const EditBaseWeapon = async(req: Request, res: Response) => {
    return _EditCard(req, res, BaseWeaponCardModel);
}

export const EditFormWeapon = async(req: Request, res: Response) => {
    return _EditCard(req, res, FormWeaponCardModel);
}

export const EditSkillWeapon = async(req: Request, res: Response) => {
    return _EditCard(req, res, SkillWeaponCardModel);
}

export const EditBaseHack = async(req: Request, res: Response) => {
    return _EditCard(req, res, BaseTechnikCardModel);
}

export const EditIOHack = async(req: Request, res: Response) => {
    return _EditCard(req, res, IOTechnikCardModel);
}

export const EditProtocolHack = async(req: Request, res: Response) => {
    return _EditCard(req, res, ProtocolTechnikCardModel);
}

export const EditModifierHack = async(req: Request, res: Response) => {
    return _EditCard(req, res, ModifierTechnikCardModel);
}

const _EditCard = async (req: Request, res: Response, Model: mongoose.Model<any>) => {
    try {
        const existingSpell = await Model.findOne({_id: req.params.id})
        if (!existingSpell) {
            return res.status(404).send(`Could not find a card with id ${req.params.id}`);
        }
        await Model.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

        let message = { message: "Card successfully updated" };

        return res.status(202).json(message);
    } catch (err) {
        return res.status(500).send(err);
    }
};


