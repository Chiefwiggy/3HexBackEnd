import mongoose from 'mongoose'
import {EArmorClass} from "../../Enums/EquipmentEnums";
import {_UPrerequisiteType, EPrerequisiteTypes} from "../../Enums/CardEnums";
import {_IScalingData, IScalingData} from "../Cards/BaseWeaponCardModel";

export interface _IArmor {
    armorName: string,
    armorClass: string,
    vitalityRequirement: _IScalingData<number>,
    additionalPrerequisites: _IScalingData<Array<{
        prerequisiteType: string
        skill: string,
        level: number
    }>>,
    pDEFBonus: _IScalingData<number>,
    mDEFBonus: _IScalingData<number>,
    blockPDEFBonus: _IScalingData<number>,
    blockMDEFBonus: _IScalingData<number>
}

const ArmorSchema = new mongoose.Schema<_IArmor>({
    armorName: {type: String, required: true, unique: true},
    armorClass: {
        type: String,
        enum: EArmorClass,
        required: true,
        default: 'standard'
    },
    vitalityRequirement: IScalingData(Number, 0),
    additionalPrerequisites: IScalingData([
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
    ], []),
    pDEFBonus: IScalingData(Number, 0),
    mDEFBonus: IScalingData(Number, 0),
    blockPDEFBonus: IScalingData(Number, 0),
    blockMDEFBonus: IScalingData(Number, 0),
})

const ArmorModel = mongoose.model('armor', ArmorSchema)

export default ArmorModel;