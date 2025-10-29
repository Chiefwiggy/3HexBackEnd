import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import SourceModel, {_ISourceSchema} from "../Models/SourceModel";
import {UpdateCacheInternal} from "./CacheController";
import DatachipModel, {_IDatachipHackIdInterface, _IDatachipSchema} from "../Models/DatachipModel";
import BaseTechnikCardModel from "../Models/Cards/BaseTechnikCardModel";
import IOTechnikCardModel from "../Models/Cards/IOTechnikCardModel";
import ProtocolTechnikCardModel from "../Models/Cards/ProtocolTechnikCardModel";
import ModifierTechnikCardModel from "../Models/Cards/ModifierTechnikCardModel";


export const AddDatachip = new ValidQueryBuilder()
    .admin()
    .success((async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new DatachipModel({...req.body});
            await data.save();
            await UpdateCacheInternal(["datachips"])
            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }))
    .exec();

export const GetAllDatachips = async(req: Request, res: Response) => {
    const data = await _GetAllDatachips(req, res);
    res.status(data.status).json(data.data);
}

export const _GetAllDatachips = async (req: Request, res: Response) => {
    try {
        const allDatachipsRaw = await DatachipModel.find({});
        const allDatachipsPost = await Promise.all(allDatachipsRaw.map(async(datachip: _IDatachipSchema) => {
            const a = await _PopulateDatachipCards(datachip);
            return a;
        }));
        return {
            status: 200,
            data: allDatachipsPost
        }
    } catch (e) {
        return {
            status: 500,
            data: e
        }
    }
}

export const _PopulateDatachipCards = async (datachip: _IDatachipSchema) => {
    const cardMap = await Promise.all(
        datachip.builtinHackIds.map(async (datachipIdData: _IDatachipHackIdInterface) => {
            let cardData = null;
            if (datachipIdData.cardType === "function") {
                cardData = await BaseTechnikCardModel.findById(datachipIdData.hackId)
            } else if (datachipIdData.cardType === "io") {
                cardData = await IOTechnikCardModel.findById(datachipIdData.hackId)
            } else if (datachipIdData.cardType === "protocol") {
                cardData = await ProtocolTechnikCardModel.findById(datachipIdData.hackId)
            } else {
                cardData = await ModifierTechnikCardModel.findById(datachipIdData.hackId)
            }
            return cardData
        })
    )
    return {
        datachipName: datachip.datachipName,
        baseTechnikCapacity: datachip.baseTechnikCapacity,
        primaryTechnikScaling: datachip.primaryTechnikScaling,
        secondaryTechnikScaling: datachip.secondaryTechnikScaling,
        primaryTechnikStat: datachip.primaryTechnikStat,
        secondaryTechnikStat: datachip.secondaryTechnikStat,
        prerequisites: datachip.prerequisites,
        builtinHacks: cardMap,
        visibility: datachip.visibility,
    }
}