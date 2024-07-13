
import {Request, Response} from "express";
import ClassModel from "../Models/ClassModel";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";

export const GetAllClassesOfTier = async(req: Request, res: Response) => {

    try {
        const classes = await ClassModel.find({classTier: req.params["tier"]});
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const AddClass = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new ClassModel({...req.body});
            await data.save();
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    })
    .exec();