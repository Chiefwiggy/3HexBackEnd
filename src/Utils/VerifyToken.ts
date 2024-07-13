import jwt, {TokenExpiredError} from 'jsonwebtoken'
import {Request} from 'express'
import UserModel from "../Models/UserModel";

export interface ITokenVerificationStruct {
    success: boolean,
    tokenData: string | jwt.JwtPayload
}

export const VerifyToken = async(req: Request): Promise<ITokenVerificationStruct>=> {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        const tokenData = jwt.verify(token as string, process.env.JWT_SIGNATURE_PRIVATE_TOKEN as string);
        if (tokenData instanceof String) {
            console.log("gamer");
            return {
                success: false,
                tokenData: tokenData
            }
        } else {
            console.log("Win")
            return {
                success: true,
                tokenData: tokenData
            };
        }
    } catch (err: any) {
        return {
            success: false,
            tokenData: JSON.stringify(err)
        }
    }

}

export const VerifyRefreshToken = async(token: string): Promise<ITokenVerificationStruct>=> {
    try {
        const tokenData = jwt.verify(token as string, process.env.JWT_SIGNATURE_REFRESH as string);
        if (tokenData instanceof String) {
            return {
                success: false,
                tokenData: tokenData
            }
        } else {
            return {
                success: true,
                tokenData: tokenData
            };
        }
    } catch (err) {
        return {
            success: false,
            tokenData: JSON.stringify(err)
        }
    }

}