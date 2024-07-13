import {Request, Response} from 'express';
import CommanderCardModel from "../Models/Cards/CommanderCardModel";
import ClassModel from "../Models/ClassModel";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";

export const GetAllCommanderCards = async(req: Request, res: Response) => {
    try {
        const cards = await CommanderCardModel.find({});
        res.status(200).json(cards);
    } catch (e) {
        res.status(500).json(e)
    }
}

export const AddCommanderCard = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new CommanderCardModel({...req.body});
            await data.save();
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .exec();






