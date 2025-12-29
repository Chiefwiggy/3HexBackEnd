import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import DatachipModel, {_IDatachipHackIdInterface} from "../Models/DatachipModel";
import {UpdateCacheInternal} from "./CacheController";
import PackageModel, {_IPackageSchema} from "../Models/PackageModel";
import BaseTechnikCardModel from "../Models/Cards/BaseTechnikCardModel";
import IOTechnikCardModel from "../Models/Cards/IOTechnikCardModel";
import ProtocolTechnikCardModel from "../Models/Cards/ProtocolTechnikCardModel";
import ModifierTechnikCardModel from "../Models/Cards/ModifierTechnikCardModel";


export const AddPackage = new ValidQueryBuilder()
    .admin()
    .success((async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new PackageModel({...req.body});
            await data.save();
            await UpdateCacheInternal(["packages"])
            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }))
    .exec();

export const GetAllPackages = async(req: Request, res: Response) => {
    const data = await _GetAllPackages(req, res);
    res.status(data.status).json(data.data);
}

export const _GetAllPackages = async (req: Request, res: Response) => {
    try {
        const allPackagesRaw = await PackageModel.find({});
        const allPackagesPost = await Promise.all(allPackagesRaw.map( async(pkg: _IPackageSchema) => {
            return await _PopulatePackageCards(pkg);
        }))
        return {
            status: 200,
            data: allPackagesPost
        }
    } catch (e) {
        return {
            status: 500,
            data: e
        }
    }
}

export const _PopulatePackageCards = async (packageData: _IPackageSchema) => {
    const cardMap = await Promise.all(
        packageData.builtinHackIds.map(async (packageIdData: _IDatachipHackIdInterface) => {
            let cardData = null;
            if (packageIdData.cardType === "function") {
                cardData = await BaseTechnikCardModel.findById(packageIdData.hackId)
            } else if (packageIdData.cardType === "io") {
                cardData = await IOTechnikCardModel.findById(packageIdData.hackId)
            } else if (packageIdData.cardType === "protocol") {
                cardData = await ProtocolTechnikCardModel.findById(packageIdData.hackId)
            } else {
                cardData = await ModifierTechnikCardModel.findById(packageIdData.hackId)
            }
            return cardData
        })
    )
    return {
        _id: packageData._id,
        packageName: packageData.packageName,
        builtinHacks: cardMap,
        visibility: packageData.visibility,
        prerequisites: packageData.prerequisites,
        packageSlots: packageData.packageSlots
    }
}