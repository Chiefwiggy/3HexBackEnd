import {Request, Response} from 'express'
import MountBaseModel from "../../Models/MountBaseModel";
import ValidQueryBuilder from "../../Utils/ValidQueryBuilder";
import {_IUserModel} from "../../Models/UserModel";
import ShieldModel from "../../Models/Equipment/ShieldModel";




export const GetAllMounts = async(req: Request, res: Response) => {
    const allMounts = await MountBaseModel.find({});
    res.status(200).json(allMounts);
}

export const AddMount = new ValidQueryBuilder()
    .addPerm('admin')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new MountBaseModel({...req.body});
            await data.save();
            res.status(201).json({
                status: "success",
                id: data._id,
                data: {...data}
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }).exec();