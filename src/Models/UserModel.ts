import mongoose, {Schema, Document} from 'mongoose'
import {ECharacterAccess, EPermission, UPermission} from "../Enums/UserEnums";

export interface _IUserModel extends Document {
    _id: string,
    email: string,
    name: string,
    password: string,
    userPermissions: Array<UPermission>
    characters_owned: Array<{
        id: string,
        access_mode: string
    }>,
    privateAPIRequests: number
}

const UserSchema = new Schema<_IUserModel>({
    email: {type: String, required: true, unique: true, lowercase: true},
    name: String,
    password: {type: String, required: true},
    userPermissions: [
        {
            type: String
        }
    ],
    characters_owned: [
        {
            id: {type: String, required: true},
            access_mode: {
                type: String,
                enum: ECharacterAccess,
                default: "edit",
                required: true
            }
        }
    ],
    privateAPIRequests: {type: Number, default: 0}
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;