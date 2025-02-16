import {Request, Response} from 'express'
import ShieldModel from "../../Models/Equipment/ShieldModel";
import ValidQueryBuilder from "../../Utils/ValidQueryBuilder";
import {_IUserModel} from "../../Models/UserModel";

export const GetAllShields = async(req: Request, res: Response) => {
    const allShields = await ShieldModel.find({});
    res.status(200).json(allShields);
}

export const AddShield = new ValidQueryBuilder()
    .addPerm('admin')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new ShieldModel({...req.body});
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