import {Request, Response} from 'express';
import SourceModel, {_ISourceSchema, _ITierData} from "../Models/SourceModel";
import LawModel from "../Models/LawModel";
import BaseSpellCardModel from "../Models/Cards/BaseSpellCardModel";
import ModifierSpellCardModel from "../Models/Cards/ModifierSpellCardModel";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";


export const GetAllSources = async(req: Request, res: Response) => {
    const data = await _GetAllSources(req, res);
    res.status(data.status).json(data.data);

}
export const _GetAllSources = async (req: Request, res: Response) => {
    try {
        const allSourcesRaw = await SourceModel.find({});
        const allSourcesPost = await Promise.all(allSourcesRaw.map(async(source: _ISourceSchema) => {
            const a = await _PopulateSourceData(source);
            return a;
        }));
        return {
            status: 200,
            data: allSourcesPost
        }
    } catch (e) {
        return {
            status: 500,
            data: e
        }
    }

}

export const _PopulateSourceData = async (sourceData: _ISourceSchema) => {
    let law = null;
    if (sourceData.lawId) {
        law = await LawModel.findById(sourceData.lawId);
    }
    const sourceTiers = await Promise.all(
        sourceData.sourceTiers.map(async (tier: _ITierData) => {
            let cardData = null;
            if (tier.cardType === "base") {
                cardData = await BaseSpellCardModel.findById(tier.cardId);
            } else {
                cardData = await ModifierSpellCardModel.findById(tier.cardId);
            }
            return {
                layer: tier.layer,
                cardType: tier.cardType,
                arcaneRequirement: tier.arcaneRequirement,
                isSecret: tier.isSecret,
                cardData
            };
        })
    );
    return {
            _id: sourceData._id,
            sourceName: sourceData.sourceName,
            sourceArcanotype: sourceData.sourceArcanotype,
            sourceTier: sourceData.sourceTier,
            law: law,
            visibility: sourceData.visibility,
            onlyTemporary: sourceData.onlyTemporary,
            neverTemporary: sourceData.neverTemporary,
            sourceTiers
        }
}

export const AddSource = new ValidQueryBuilder()
    .admin()
    .success((async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new SourceModel({...req.body});
            await data.save();

            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }))
    .exec();