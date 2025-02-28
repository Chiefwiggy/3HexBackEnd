import ConditionModel from "../Models/ConditionModel";
import {Request, Response} from "express";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";


export const GetAllConditions = async(req: Request, res: Response) => {
    try {
        const allConditions = await ConditionModel.find({});
        res.status(200).json(allConditions);
    } catch(err) {
        res.status(500).send("Could not find anything...");
    }
}

export const AddCondition = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new ConditionModel({...req.body});
            await data.save();

            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (err) {
            res.status(404).send(err)
        }
    })
    .exec();