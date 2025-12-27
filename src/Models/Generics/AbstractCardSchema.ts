import mongoose, {Schema} from 'mongoose'
import {
    _UPrerequisiteType,
    ECardSubtypes,
    EEmblemType,
    EPrerequisiteTypes
} from "../../Enums/CardEnums";

const IDataModifiers = {
    modifier: {type: Number, required: false},
    multiplier: {type: Number, required: false},
    override: {type: Number, required: false}
}

export interface _IDataModifiers {
    modifier: number,
    multiplier: number,
    override: number
}

export interface _IAbstractCardData extends Document {
    _id: string,
    cardName: string,
    cardType: string
    cardSubtype: string
    effects: Array<{
        text: string,
        icon: {
            emblem: string,
            symbol: string,
            text: string
        },
        powerX?: number
    }>,
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType
        skill: string,
        level: number
    }>,
    isUltimate?: boolean,
    isFavorite?: boolean,
    fullRangeMod?: _IDataModifiers,
    minRangeMod?: _IDataModifiers,
    maxRangeMod?: _IDataModifiers,
    powerMod?: _IDataModifiers,
    basePowerMod?: _IDataModifiers,
    potencyMod?: _IDataModifiers,
    staminaCostMod?: _IDataModifiers,
    tetherCostMod?: _IDataModifiers,
    technikCostMod?: _IDataModifiers,
    specialLogicTags?: Array<string>
    moneyCostMod?: _IDataModifiers
}

const AbstractCardSchema = new Schema({
    cardName: {type: String, required: true, unique: true},
    cardType: {
        type: String,
        enum: ["spell", "weapon", "hack", "commander", "condition"],
        required: true,
        default: "spell"
    },
    cardSubtype: {
        type: String,
        enum: ECardSubtypes,
        required: true,
        default: "base"
    },
    effects: [
        {
            text: {type: String, required: true},
            icon: {
                emblem: {
                    type: String,
                    enum: EEmblemType,
                    default: "default",
                },
                symbol: String,
                text: String
            },
            powerX: {type: Number, required: false}
        }
    ],
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
    isFavorite: {type: Boolean, default: false},
    fullRangeMod: IDataModifiers,
    minRangeMod: IDataModifiers,
    maxRangeMod: IDataModifiers,
    powerMod: IDataModifiers,
    basePowerMod: IDataModifiers,
    potencyMod: IDataModifiers,
    staminaCostMod: IDataModifiers,
    tetherCostMod: IDataModifiers,
    technikCostMod: IDataModifiers,
    specialLogicTags: [String],
    moneyCostMod: IDataModifiers
}, {discriminatorKey: 'kind'});

export default AbstractCardSchema