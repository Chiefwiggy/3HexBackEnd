import {Schema} from 'mongoose'
import AbstractCardSchema, {_IAbstractCardData} from "../Generics/AbstractCardSchema";
import {EDamageSubtypes, EDamageTypes, EWeaponClass} from "../../Enums/CardEnums";

const IDataModifiers = {
    modifier: {type: Number, required: false},
    multiplier: {type: Number, required: false},
    override: {type: Number, required: false}
}

interface _IDataModifiers {
    modifier: number,
    multiplier: number,
    override: number
}

export interface _IWeaponCardData extends _IAbstractCardData {
    baseHitMod?: _IDataModifiers,
    hitMod?: _IDataModifiers,
    baseCritMod?: _IDataModifiers,
    critMod?: _IDataModifiers,
    canUseForOffhand?: boolean,
    offhandOnly?: boolean,
    weaponClassOverride?: string,
    weaponDamageTypeOverride?: string,
    weaponDamageSubtypeOverride?: string
}

const AbstractWeaponCardSchema = new Schema<_IWeaponCardData>({
    baseHitMod: IDataModifiers,
    hitMod: IDataModifiers,
    baseCritMod: IDataModifiers,
    critMod: IDataModifiers,
    canUseForOffhand: { type: Boolean, default: false, required: true},
    offhandOnly: {type: Boolean, default: false},
    weaponClassOverride: {
        type: String,
        enum: EWeaponClass,
        required: false
    },
    weaponDamageTypeOverride: {
        type: String,
        enum: EDamageTypes,
        required: false
    },
    weaponDamageSubtypeOverride: {
        type: String,
        enum: EDamageSubtypes,
        required: false
    }
}, {discriminatorKey: "kind"})
AbstractWeaponCardSchema.add(AbstractCardSchema);

export default AbstractWeaponCardSchema