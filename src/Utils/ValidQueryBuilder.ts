import {Request, Response} from 'express'
import {VerifyToken} from "./VerifyToken";
import UserModel, {_IUserModel} from "../Models/UserModel";
import jwt from 'jsonwebtoken'
import {UPermission} from "../Enums/UserEnums";

class ValidQueryBuilder {

    private successFn: (req: Request, res: Response, user: any) => Promise<void>
    private failFn: ((err: any) => Promise<void>) | null
    private accessReq: Array<UPermission>

    constructor() {
        this.successFn = async(req: Request, res: Response, user: _IUserModel) => {}
        this.failFn = null
        this.accessReq = []
    }

    public addPerm(access: UPermission) {
        this.accessReq.push(access);
        return this;
    }

    public admin() {
        this.accessReq = ["admin"]
        return this;
    }

    public success(fn: (req: Request, res: Response, user: any) => Promise<void>) {
        this.successFn = fn;
        return this;
    }

    public fail(fn: (err: any) => Promise<void>) {
        this.failFn = fn;
        return this;
    }

    public exec(): (req: Request, res: Response) => Promise<void> {
        return async(req: Request, res: Response) => {
            const verifyResponse = await VerifyToken(req);
            if (verifyResponse.success) {
                const user: _IUserModel | null = await UserModel.findOne({email: (verifyResponse as jwt.JwtPayload).tokenData.email});
                if (user &&
                    (
                        user.userPermissions.includes("admin") ||
                        this.accessReq.every(e => user.userPermissions.includes(e))
                    )
                ) {
                    await this.successFn(req, res, user);
                } else {
                    res.status(403).send("You lack permission for this route");
                }
                return;
            } else {
                if (JSON.parse(verifyResponse.tokenData as any).name == "TokenExpiredError") {
                    res.status(417).send("Please sign back in.");
                }
                else if (this.failFn != null) {
                    await this.failFn(verifyResponse.tokenData);
                } else {
                    res.status(500).json(verifyResponse.tokenData);
                }
                return;
            }
        }
    }


}

export default ValidQueryBuilder;