import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import DowntimeActivityModel from "../Models/DowntimeActivityModel";
import {_GetAllSources, _PopulateSourceData} from "./SourceController";
import SourceModel, {_ISourceSchema} from "../Models/SourceModel";


export const AddDowntimeActivity = new ValidQueryBuilder()
    .admin()
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new DowntimeActivityModel({...req.body});
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

export const GetAllDowntimeActivities = async(req: Request, res: Response) => {
    const dts = await DowntimeActivityModel.find({});
    res.status(200).json(dts);
}



