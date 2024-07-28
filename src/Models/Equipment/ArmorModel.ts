import mongoose from 'mongoose'
import {EArmorClass} from "../../Enums/EquipmentEnums";
import {_UPrerequisiteType, EPrerequisiteTypes} from "../../Enums/CardEnums";

export interface _IArmor {
    armorName: string,
    armorClass: string,
    vitalityRequirement: number,
    additionalPrerequisites: Array<{
        prerequisiteType: string
        skill: string,
        level: number
    }>,
    pDEFBonus: number,
    mDEFBonus: number,
    blockPDEFBonus: number,
    blockMDEFBonus: number
}

const ArmorSchema = new mongoose.Schema<_IArmor>({
    armorName: {type: String, required: true, unique: true},
    armorClass: {
        type: String,
        enum: EArmorClass,
        required: true,
        default: 'standard'
    },
    vitalityRequirement: { type: Number, required: true, default: 0 },
    additionalPrerequisites: [
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
    pDEFBonus: {type: Number, required: true, default: 0},
    mDEFBonus: {type: Number, required: true, default: 0},
    blockPDEFBonus: {type: Number, required: true, default: 0},
    blockMDEFBonus: {type: Number, required: true, default: 0}
})

const ArmorModel = mongoose.model('armor', ArmorSchema)

export default ArmorModel;