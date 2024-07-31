import {Request, Response} from 'express';
import CharacterModel, {_ICharacterData} from "../Models/CharacterModel";
import {VerifyToken} from "../Utils/VerifyToken";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import mongoose from 'mongoose'

export const GetAllCharacters = async (req: Request, res: Response) : Promise<void> => {
    try {
        const result = await CharacterModel.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Could not find anything...");
    }
}

export const GetCharacterById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const char = await CharacterModel.findById(req.params["id"]);
        if (char) {
            res.status(200).json(char);
        }

    } catch (err) {
        res.status(500).send("Could not find anything...");
    }
}

export const GetCharactersFromUser = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            // @ts-ignore
            const char: Array<any> | null = await CharacterModel.find({
                _id: {$in: user.characters_owned.map(e => e.id)}
            })
            if (char) {
                res.status(200).json(char)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .exec();




export const AddCharacter = async (req: Request, res: Response) : Promise<void> => {
    try {
        const data = new CharacterModel({...req.body});
        await data.save();

        res.status(201).json({
            status: "success",
            data: {...data}
        });
    } catch (err) {
        res.status(404).send(err);
    }
}

export const UpdateCharacter = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const existingChar = await CharacterModel.findById(req.params.characterId);
            if (!existingChar) {
                res.status(404).send("Could not find character.")
                return;
            }
            await CharacterModel.findByIdAndUpdate(
                req.params.characterId,
                { $set: req.body, $inc: {__v: 1}},
                { new: true, runValidators: true}
            )
            let message = { message: "Character successfully updated" };
            res.status(202).json(message);
        } catch (e) {
            console.error(e)
            res.status(500).send(e)
        }

    })
    .exec();