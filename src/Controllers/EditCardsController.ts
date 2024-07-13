import {Request, Response} from 'express';
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import mongoose from "mongoose";
import TargetSpellCardModel from "../Models/Cards/TargetSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";

export const EditBaseSpell = async(req: Request, res: Response) => {
    return _EditSpell(req, res, BaseSpellCardModel);
}

export const EditTargetSpell = async(req: Request, res: Response) => {
    return _EditSpell(req, res, TargetSpellCardModel);
}

export const EditModifierSpell = async(req: Request, res: Response) => {
    return _EditSpell(req, res, ModifierSpellCardModel);
}

const _EditSpell = async (req: Request, res: Response, Model: mongoose.Model<any>) => {
    try {
        const existingSpell = await Model.findOne({_id: req.params.id})
        if (!existingSpell) {
            return res.status(404).send(`Could not find a spell with id ${req.params.id}`);
        }
        await Model.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

        let message = { message: "Spell successfully updated" };

        return res.status(202).json(message);
    } catch (err) {
        return res.status(500).send(err);
    }
};
