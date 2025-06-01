import RaceModel from "../Models/RaceModel";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";


export const GetAllRaces = async(req: Request, res: Response)=> {
    const data = await RaceModel.find({});
    res.status(200).json(data)
}

export const AddRace = new ValidQueryBuilder()
    .admin()
    .success((async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new RaceModel({...req.body});
            await data.save();

            res.status(201).json({
                status: "success",
                _id: data._id,
                data: {...data}
            })
        } catch (e) {
            res.status(500).json(e);
        }
    })).exec()