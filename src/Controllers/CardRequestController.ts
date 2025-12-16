import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import ImageLibraryModel from "../Models/ImageLibraryModel";
import LawModel from "../Models/LawModel";
import CardRequestModel from "../Models/CardRequestModel";


export const GetAllCardRequests = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const entries = await CardRequestModel.find();
            res.status(200).json({
                message: `All requests`,
                requests: entries
            })
        } catch (e) {
            res.status(404).json({
                message: "Images not found.",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()

export const GetCardRequestById = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const entry = await CardRequestModel.findById(req.params.requestId)
            res.status(200).json({
                message: `Found entry ${req.params.requestId}`,
                entry: entry

            })
        } catch (e) {
            res.status(404).json({
                message: "Request not found.",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()

export const MakeRequest = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const data = new CardRequestModel({...req.body});
            await data.save();

            res.status(201).json({
                status: "success",
                data: {...data}
            })
        } catch (e) {
            res.status(500).json({
                message: "Request unable to be made",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()


export const DeleteRequest = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const entry = await CardRequestModel.findByIdAndDelete(req.params.requestId)
            res.status(200).json({
                message: `Deleted entry ${req.params.requestId}`,
                entry: entry
            })
        } catch (e) {
            res.status(404).json({
                message: "Images not found.",
                error: JSON.stringify(e)
            })
        }


    })
    .exec()