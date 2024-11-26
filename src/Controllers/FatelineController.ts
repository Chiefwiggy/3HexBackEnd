import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import FatelineModel, {_IFatelineData} from "../Models/FatelineModel";
import {_GetAllCardsOfCriteria} from "./GetCardDataController";
import {_GetAllAbilitiesForCriteria} from "./AbilityController";
import {_IAbstractCardData} from "../Models/Generics/AbstractCardSchema";
import {_IAbilityModel} from "../Models/AbilityModel";



export const AddFateline = new ValidQueryBuilder()
    .admin()
    .success((async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new FatelineModel({...req.body});
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

export const GetFatelineData = async(req: Request, res: Response) => {
    const baseFatelineData: Array<_IFatelineData> = await FatelineModel.find({});

    const fatelineCards = (await _GetAllCardsOfCriteria(req, res, "fateline", true)).data as any
    const fatelineAbilities = (await _GetAllAbilitiesForCriteria(req, res, "fateline")).data as any

    return baseFatelineData.map(fateline => {

        return {
            fatelineName: fateline.fatelineName,
            fatelineId: fateline.fatelineId,
            fatelineNumber: fateline.fatelineNumber,
            upright: {
                fatelineDescription: fateline.upright.fatelineDescription,
                affinityChoices: fateline.upright.affinityChoices,
                cards: (fatelineCards[fateline.fatelineId] ?? []).filter((card: _IAbstractCardData) => (card.prerequisites.find((pr: any) => pr.prerequisiteType === "fateline")?.level === 1)),
                abilities: (fatelineAbilities[fateline.fatelineId] ?? []).filter((card: _IAbilityModel) => (card.prerequisites.find((pr: any) => pr.prerequisiteType === "fateline")?.level === 1)),
            },
            reversed: {
                fatelineDescription: fateline.reversed.fatelineDescription,
                affinityChoices: fateline.reversed.affinityChoices,
                cards: (fatelineCards[fateline.fatelineId] ?? []).filter((card: _IAbstractCardData) => (card.prerequisites.find((pr: any) => pr.prerequisiteType === "fateline")?.level === -1)),
                abilities: (fatelineAbilities[fateline.fatelineId] ?? []).filter((card: _IAbilityModel) => (card.prerequisites.find((pr: any) => pr.prerequisiteType === "fateline")?.level === -1)),
            }
        }
    })
}