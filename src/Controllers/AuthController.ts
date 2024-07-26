import {Request, Response} from "express";
import UserModel, {_IUserModel} from "../Models/UserModel";
import bcrypt from 'bcrypt'
import {GenerateAccessToken, GenerateRefreshToken} from "../Utils/GenerateAccessToken";
import {ITokenVerificationStruct, VerifyRefreshToken} from "../Utils/VerifyToken";
import {JwtPayload} from "jsonwebtoken";
import ValidQueryBuilder from "../Utils/ValidQueryBuilder";

export const SignUpUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const user = new UserModel({
            email: email || null,
            password: password || null,
            characters_owned: []
        })
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        return user.save().then(async(resp) => {
            const token = await GenerateAccessToken({
                password: resp.password,
                email: resp.email
            })
            return res.status(201).send({
                token,
                response: resp
            });
        }).catch(err => {
            return res.status(500).send(err);
        })
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

export const SignInUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    return UserModel.findOne({email}).then(async(resp) => {
        if (resp) {
            if (bcrypt.compareSync(password, resp.password)) {
                const token = await GenerateAccessToken({
                    email: resp.email
                })
                const refresh = await GenerateRefreshToken({
                    email: resp.email
                })
                return res.status(200).send({
                    token,
                    refresh,
                    response: resp
                });
            } else {
                return res.status(400).send("Invalid Password");
            }
        } else {
            res.status(400).send("Invalid Email");
        }
    })
}

export const SignInUserWithToken = async (req: Request, res: Response) => {
    const {email, token} = req.body;

    if (!email || !token) {
        return res.status(400).send('Email and token are required.');
    }

    const {success, tokenData} = await VerifyRefreshToken(token);

    if (success) {
        const {email} = tokenData as JwtPayload;
        return UserModel.findOne({email}).then(async(resp) =>  {
            if (!resp) {
                return res.status(404).send("Could not find your user");
            } else {
                const new_token = await GenerateAccessToken({
                    email: resp.email
                });
                const new_refresh = await GenerateRefreshToken({
                    email: resp.email
                })
                return res.status(200).send({
                    token: new_token,
                    refresh: new_refresh,
                    response: resp
                })
            }

        })
    } else {
        return res.status(400).send("Invalid token");
    }
}

export const GetAccessLevel = async(req: Request, res: Response) => {

}

export const GetUserById = async (req: Request, res: Response) => {

}

export const AddCharacterToUser = (access: string) => new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            if ( user.characters_owned.map(d => d.id).includes(req.params["characterId"])) {
                res.status(401).json("This user already has access to that character");
            } else {
                const response = await UserModel.findByIdAndUpdate(user._id, {
                    $push: {
                        characters_owned: {
                            id: req.params["characterId"],
                            access_mode: access
                        }
                   },
                })
                res.status(201).json(response);
            }
        } catch (e) {
            res.status(500).json(e);
        }

    })
    .exec()