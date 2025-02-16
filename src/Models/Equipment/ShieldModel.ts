import mongoose from 'mongoose'
import {_IScalingData, IScalingData} from "../Cards/BaseWeaponCardModel";
import {EArmorClass} from "../../Enums/EquipmentEnums";


export interface _IShield {
    shieldName: string,
    armorClass: string,
    skillRequirement: _IScalingData<number>,
    pDEFBonus: _IScalingData<number>,
    mDEFBonus: _IScalingData<number>,
    blockPDEFBonus: _IScalingData<number>,
    blockMDEFBonus: _IScalingData<number>
}

const ShieldSchema = new mongoose.Schema<_IShield>({
    shieldName: {type: String, required: true, unique: true},
    armorClass: {
        type: String,
        enum: EArmorClass,
        required: true,
        default: "standard"
    },
    skillRequirement: IScalingData(Number, 0),
    pDEFBonus: IScalingData(Number, 0),
    mDEFBonus: IScalingData(Number, 0),
    blockPDEFBonus: IScalingData(Number, 0),
    blockMDEFBonus: IScalingData(Number, 0),
})

const ShieldModel = mongoose.model('shield', ShieldSchema);

export default ShieldModel;