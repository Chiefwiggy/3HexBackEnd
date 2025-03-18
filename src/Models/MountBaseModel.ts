import mongoose, {Schema} from 'mongoose'
import {EMountTier, IMountTier} from "../Enums/MountEnums";
import {stringMap} from "aws-sdk/clients/backup";
import {EEmblemType} from "../Enums/CardEnums";

export interface _IMountDefenseBonuses {
    pDEFBonus: number,
    mDEFBonus: number,
    dodgeBonus: number
}

export interface _IMountBaseModel extends Document {
    speciesName: string,
    mountType: string,
    mountTier:IMountTier,
    mountSize: string,
    hunger: number,
    riders: number,
    associatedWeapon: string,
    favoriteTerrain: string,
    landMovement: number,
    swimMovement: number,
    flyMovement: number,
    authorityRequirement: number,
    skillRequirement: number,
    mountDefenses: _IMountDefenseBonuses,
    primaryRiderDefenses: _IMountDefenseBonuses,
    secondaryRidersDefenses: _IMountDefenseBonuses,
    mountHealth: number,
    mountStamina: number,
    mountRefresh: number,
    details: Array<{
        text: string,
        icon: {
            emblem: string,
            text: string
        }
    }>
}

const IMountDefenseBonuses = {
    pDEFBonus: {type: Number, default: 0},
    mDEFBonus: {type: Number, default: 0},
    dodgeBonus: {type: Number, default: 0},
}

const MountBaseSchema = new Schema({
    speciesName: {type: String, required: true, unique: true},
    mountType: {type: String, required: true, default: "standard"},
    mountTier: {
        type: String,
        enum: EMountTier,
        required: true,
        default: "basic"
    },
    mountSize: {
        type: String,
        enum: ["tiny", "small", "standard", "large", "colossal"],
        required: true,
        default: "standard"
    },
    hunger: {type: Number, required: true, default: 4},
    riders: {type: Number, required: true, default: 1},
    associatedWeapon: String,
    favoriteTerrain: String,
    landMovement: {type: Number, required: true, default: 4},
    swimMovement: {type: Number, required: true, default: 0},
    flyMovement: {type: Number, required: true, default: 0},
    authorityRequirement: {type: Number, required: true, default: 3},
    skillRequirement: {type: Number, required: true, default: 3},
    mountDefenses: IMountDefenseBonuses,
    primaryRiderDefenses: IMountDefenseBonuses,
    secondaryRidersDefenses: IMountDefenseBonuses,
    mountHealth: {type: Number, required: true, default: 40},
    mountStamina:  {type: Number, required: true, default: 40},
    mountRefresh:  {type: Number, required: true, default: 16},
    details: [
        {
            text: {type: String, required: true},
            icon: {
                emblem: {
                    type: String,
                    enum: EEmblemType,
                    default: "default",
                },
                text: String
            }
        }
    ]
})

const MountBaseModel = mongoose.model('mounts', MountBaseSchema);

export default MountBaseModel;