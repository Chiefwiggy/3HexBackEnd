import mongoose, {Schema} from 'mongoose'
import {_UPrerequisiteType, EDamageSubtypes, EDamageTypes, EEmblemType, EPrerequisiteTypes} from "../Enums/CardEnums";
import {_IScalingData, IScalingData} from "./Cards/BaseWeaponCardModel";

export interface _IGadgetModel extends Document {
    _id: string,
    gadgetName: string,
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
        prerequisiteType: _UPrerequisiteType,
        skill: string,
        level: number
    }>,
    gadgetActionType: string,
    gadgetType: string,
    packageSlots: number,
    technikCost: number,
    surgeCost: number,
    basePower: number,
    baseHit: number,
    potency: number,
    damageType: string,
    damageSubtype: string,
    visibility: string,
    bonuses: Object,
    unlocks: Object,

}

const GadgetSchema = new Schema<_IGadgetModel>({
    gadgetName: {type: String, required: true},
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
    damageType: {
        type: String,
        enum: EDamageTypes,
        required: true,
        default: "physical"
    },
    damageSubtype: {
        type: String,
        enum: EDamageSubtypes,
        required: true,
        default: "slash"
    },
    gadgetActionType: {type: String, required: true, enum: ["passive", "active"], default: "passive"},
    gadgetType: {type: String, required: true, default: "equipment"},
    packageSlots: {type: Number, required: true, default: 1},
    technikCost: {type: Number, required: true, default: 0},
    surgeCost: {type: Number, required: true, default: 0},
    baseHit: {type: Number, required: true, default: 10},
    basePower: {type: Number, required: true, default: 10},
    potency: {type: Number, required: false, default: 2.0},
    visibility: {type: String, required: true, default: "all", enum: ["all", "restricted", "admin"]},
    bonuses: Object,
    unlocks: Object,
});

const GadgetModel = mongoose.model('gadgets', GadgetSchema);

export default GadgetModel;