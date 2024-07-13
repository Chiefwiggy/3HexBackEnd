import mongoose from 'mongoose'
import {EArmorClass} from "../../Enums/EquipmentEnums";
import {EPrerequisiteTypes} from "../../Enums/CardEnums";

const ArmorSchema = new mongoose.Schema({
    armorName: {type: String, required: true, unique: true},
    armorClass: {
        type: String,
        enum: EArmorClass,
        required: true,
        default: 'standard'
    },
    vitalityRequirement: { type: Number, required: true, default: 0 },
    additionalPrerequisities: [
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