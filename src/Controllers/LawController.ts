import {Request, Response} from 'express';
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import LawModel from "../Models/LawModel";

export const AddLaw = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new LawModel({...req.body});
            await data.save();

            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json(e)
        }
    })
    .exec();