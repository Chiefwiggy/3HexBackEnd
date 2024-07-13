import mongoose, {Schema, Document} from 'mongoose'
import {ECharacterAccess, EPermission, UPermission} from "../Enums/UserEnums";

export interface _IUserModel extends Document {
    _id: string,
    email: string,
    password: string,
    userPermissions: Array<UPermission>
    characters_owned: Array<{
        id: string,
        access_mode: string
    }>
}

const UserSchema = new Schema<_IUserModel>({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    userPermissions: [
        {
            type: String,
            enum: EPermission
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
    ]
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;