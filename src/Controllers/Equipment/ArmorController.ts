import {Request, Response} from 'express'
import ArmorModel from "../../Models/Equipment/ArmorModel";
import ValidQueryBuilder from "../../Utils/ValidQueryBuilder";
import {_IUserModel} from "../../Models/UserModel";
import ConsumableModel from "../../Models/Equipment/ConsumableModel";


export const GetAllArmor = async(req: Request, res: Response) => {
    const allArmor = await ArmorModel.find({})
    res.status(200).json(allArmor);
}

export const GetArmorById = async(req: Request, res: Response) => {
    try {
        const armor = await ArmorModel.findById(req.params.armorID);
        if (armor) {
            res.status(200).json(armor);
        } else {
            res.status(404).json({
                message: "Armor ID does not exist",
                armor: armor
            })
        }
    } catch (err) {
        res.status(500).json(err);
    }


}

export const AddArmor = new ValidQueryBuilder()
    .addPerm('admin')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new ArmorModel({...req.body});
            await data.save();
            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (err) {
            res.status(500).send(err);
        }
    })
    .exec();

export const AddConsumable = new ValidQueryBuilder()
    .addPerm('admin')
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new ConsumableModel({...req.body});
            await data.save();
            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (err) {
            res.status(500).send(err);
        }
    })
    .exec();

