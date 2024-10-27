import mongoose, {Schema} from 'mongoose'
import AbstractSpellCardSchema, {_ISpellCardData} from "./AbstractSpellCardSchema";
import {EArcanotype, EDamageSubtypes, EDamageTypes, ESaveTypes} from "../../Enums/CardEnums";


export interface _IBaseSpellCardData extends _ISpellCardData, Document {
    arcanotype: string,
    basePower: number,
    potency: number,
    duration: number,
    tetherCost: number,
    staminaCost: number,
    energyCost: number,
    environmentBonus: string,
    damageType: string,
    damageSubtype: string,
    baseSpellSet: number,
    saveType: string
}


const BaseSpellCardSchema = new Schema<_IBaseSpellCardData>({
    arcanotype: {
        type: String,
        enum: EArcanotype,
        required: true,
        default: "elemental"
    },
    basePower: {type: Number, required: true},
    potency: {type: Number, required: true},
    duration: {type: Number, required: true, default: 2},
    tetherCost: {type: Number, required: true},
    staminaCost: {type: Number, required: false, default: 0},
    energyCost: {type: Number, required: true, default: 0},
    baseSpellSet: {type: Number, required: true, default: 0},
    saveType: {type: String, required: false, enum: ESaveTypes, default: "none"},
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
    environmentBonus: {type: String, required: true}
})

BaseSpellCardSchema.add(AbstractSpellCardSchema);

const BaseSpellCardModel = mongoose.model<_IBaseSpellCardData>('spells_base', BaseSpellCardSchema);

export default BaseSpellCardModel