import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import GadgetModel, {_IGadgetModel} from "../Models/GadgetModel";
import CardRequestModel from "../Models/CardRequestModel";
import {_PossibleFilter} from "./GetCardDataController";
import AbilityModel from "../Models/AbilityModel";
import {_EditCard} from "./EditCardsController";
import {UpdateCacheInternal} from "./CacheController";
import CharacterModel, {_ICharacterData} from "../Models/CharacterModel";


export const GetAllGadgets = (req: Request, res: Response) => {
    try {
        const entries = GadgetModel.find({});
        res.status(200).json({
            status: "success",
            gadgets: entries
        })
    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e
        })
    }
}

export const GetGadgetsPossibleForCharacter = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const char: _ICharacterData | null = await CharacterModel.findById(req.params["characterId"]);
            const entries = await GadgetModel.find({})
            if (char) {
                const allPossibleGadgets = await _PossibleFilter(entries, char)
                res.status(200).json({
                    status: "success",
                    gadgets: allPossibleGadgets
                })
            } else {
                res.status(404).json({message: `character with id ${req.params["characterId"]} not found.`})
            }

        } catch (e) {
            res.status(500).json({
                status: "failure",
                message: e
            })
        }
    })
    .exec()

export const AddGadget = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new GadgetModel({...req.body});
            await data.save();

            await UpdateCacheInternal(["gadgets"]);

            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json({
                message: "Request unable to be made",
                error: JSON.stringify(e)
            })
        }
    })
    .exec()

export const UpdateGadget = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        await _EditCard(req, res, GadgetModel, ["gadgets"]);
    })
    .exec()