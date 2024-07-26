import AbstractWeaponCardSchema, {_IWeaponCardData} from "./AbstractWeaponCardSchema";
import mongoose, {Schema} from "mongoose";
import {ECritDie, EDamageSubtypes, EDamageTypes, EWeaponClass, EWeaponType} from "../../Enums/CardEnums";

export interface _IScalingData<T> {
    baseValue: T,
    scalingPer?: number,
    breakpoints?: Array<number>
    breakpointBonuses?: Array<T>
}

export interface _ICritData {
    d1: string,
    d2: string,
    d3: string,
    d4: string,
    d5: string,
    d6: string
}

export interface _IBaseWeaponCardData extends _IWeaponCardData {
    baseHit: _IScalingData<number>,
    basePower: _IScalingData<number>,
    potency: _IScalingData<number>,
    weaponClass: string,
    weaponType: string,
    baseCrit: _IScalingData<number>,
    damageType: string,
    damageSubtype: string,
    specialCrit: _IScalingData<_ICritData>,
    baseRange: {
        min: _IScalingData<number>,
        max: _IScalingData<number>,
        isMelee: boolean
    },
    canThrow: _IScalingData<boolean>,
    thrownRange: {
        min: _IScalingData<number>,
        max: _IScalingData<number>,
        isMelee: boolean
    },
    tetherCost: _IScalingData<number>,
    staminaCost: _IScalingData<number>,
    skillRequirement: _IScalingData<number>,
    weaponTags: Array<string>
}

export const IScalingData = (T: StringConstructor | NumberConstructor | BooleanConstructor | Object, defaultData: string | number | boolean | Object) => {
    return {
        baseValue: {type: T, required: true, default: defaultData},
        scalingPer: {type: T, required: false},
        breakpoints: [Number],
        breakpointBonuses: [T]
    }

}

const BaseWeaponCardSchema = new Schema<_IBaseWeaponCardData>({
    baseHit: IScalingData(Number, 10),
    basePower: IScalingData(Number, 10),
    potency: IScalingData(Number, 2.0),
    weaponClass: {
        type: String,
        enum: EWeaponClass,
        required: true,
        default: "standard"
    },
    weaponType: {
        type: String,
        enum: EWeaponType,
        required: true,
        default: "blade"
    },
    baseCrit: IScalingData(Number, 0),
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
        default: "slashing"
    },
    specialCrit: IScalingData({
        d1: { type: String, enum: ECritDie, required: true },
        d2: { type: String, enum: ECritDie, required: true },
        d3: { type: String, enum: ECritDie, required: true },
        d4: { type: String, enum: ECritDie, required: true },
        d5: { type: String, enum: ECritDie, required: true },
        d6: { type: String, enum: ECritDie, required: true },
    }, {
        d1: "-",
        d2: "-",
        d3: "-",
        d4: "-",
        d5: "-",
        d6: "-"
    }),
    baseRange: {
        min: IScalingData(Number, 0),
        max: IScalingData(Number, 0),
        isMelee: {type: Boolean, required: true, default: true}
    },
    thrownRange: {
        min: IScalingData(Number, 0),
        max: IScalingData(Number, 0),
        isMelee: {type: Boolean, required: true, default: true}
    },
    canThrow: IScalingData(Boolean, false),
    tetherCost: IScalingData(Number, 0),
    staminaCost: IScalingData(Number, 0),
    skillRequirement: IScalingData(Number, 0),
    weaponTags: {type: [String], required: true, default: []}
})
BaseWeaponCardSchema.add(AbstractWeaponCardSchema)

const BaseWeaponCardModel = mongoose.model("weapons_base", BaseWeaponCardSchema);

export default BaseWeaponCardModel;