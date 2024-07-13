import AbstractWeaponCardSchema, {_IWeaponCardData} from "./AbstractWeaponCardSchema";
import mongoose, {Schema} from "mongoose";
import {ECritDie, EDamageSubtypes, EDamageTypes, EWeaponClass, EWeaponType} from "../../Enums/CardEnums";

export interface _IBaseWeaponCardData extends _IWeaponCardData {
    baseHit: number,
    basePower: number,
    potency: number,
    weaponClass: string,
    weaponType: string,
    baseCrit: number,
    damageType: string,
    damageSubtype: string,
    specialCrit: {
        d1: string,
        d2: string,
        d3: string,
        d4: string,
        d5: string,
        d6: string
    },
    baseRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    canThrow: boolean,
    thrownRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    tetherCost: number,
    staminaCost: number,
    skillRequirement: number,
    enchantmentLevel: number,
    weaponTags: Array<string>
}

const BaseWeaponCardSchema = new Schema<_IBaseWeaponCardData>({
    baseHit: {type: Number, required: true, default: 10},
    basePower: {type: Number, required: true, default: 10},
    potency: {type: Number, required: true, default: 2.0},
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
    baseCrit: {type: Number, required: true, default: 0},
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
    specialCrit: {
        d1: { type: String, enum: ECritDie, required: true },
        d2: { type: String, enum: ECritDie, required: true },
        d3: { type: String, enum: ECritDie, required: true },
        d4: { type: String, enum: ECritDie, required: true },
        d5: { type: String, enum: ECritDie, required: true },
        d6: { type: String, enum: ECritDie, required: true },
    },
    baseRange: {
        min: {type: Number, required: true, default: 0},
        max: {type: Number, required: true, default: 0},
        isMelee: {type: Boolean, required: true, default: true}
    },
    thrownRange: {
        min: {type: Number, required: true, default: 0},
        max: {type: Number, required: true, default: 0},
        isMelee: {type: Boolean, required: true, default: true}
    },
    canThrow: {type: Boolean, required: false, default: false},
    tetherCost: {type: Number, required: false, default: 0},
    staminaCost: {type: Number, required: false, default: 0},
    skillRequirement: {type: Number, required: true, default: 0},
    enchantmentLevel: {type: Number, required: true, default: 0},
    weaponTags: {type: [String], required: true, default: []}
})
BaseWeaponCardSchema.add(AbstractWeaponCardSchema)

const BaseWeaponCardModel = mongoose.model("weapons_base", BaseWeaponCardSchema);

export default BaseWeaponCardModel;