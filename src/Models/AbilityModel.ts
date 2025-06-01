import mongoose, {Schema} from 'mongoose';
import {_UPrerequisiteType, EActionType, EPrerequisiteTypes, ERefreshTypes} from "../Enums/CardEnums";

export interface _IAbilityModel extends Document {
    _id: string,
    abilityName: string,
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType,
        skill: string,
        level: number
    }>,
    description: Array<string>,
    isUltimate?: boolean,
    isPassive: boolean,
    uses: number,
    actionType: string,
    abilityRefreshTime: string,
    bonuses: Object,
    unlocks: Object,
    showByDefault?: boolean
}

const AbilitySchema = new Schema<_IAbilityModel>({
    abilityName: {type: String, required: true, unique: true},
    prerequisites: [
        {
            prerequisiteType: {
                type: String,
                enum: EPrerequisiteTypes,
                required: true,
                default: "attribute"
            },
            skill: {type: String, required: true},
            level: {type: Number, required: true}
        }
    ],
    isUltimate: {type: Boolean, default: false},
    isPassive: {type: Boolean, default: true, required: true},
    description: {type: [String], required: true},
    uses: {type: Number, required: true, default: 0},
    actionType: {type: String, enum: EActionType, required: false},
    abilityRefreshTime: {type: String, required: true, enum: ERefreshTypes, default: "passive"},
    bonuses: Object,
    unlocks: Object,
    showByDefault: {type: Boolean, default: true, required: false}
})

const AbilityModel = mongoose.model('abilities', AbilitySchema);

export default AbilityModel;  