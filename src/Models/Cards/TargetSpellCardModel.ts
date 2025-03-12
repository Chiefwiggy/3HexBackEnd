import mongoose, {Schema} from "mongoose";
import AbstractSpellCardSchema from "./AbstractSpellCardSchema";
import {_IBaseSpellCardData} from "./BaseSpellCardModel";

export interface _ITargetSummonScaling {
    potency: number,
    scalingStat: string,
    baseValue: number
}

export const ITargetSummoningScaling = (defaultData: number, defaultScaling: string, defaultPotency: number) => {
    return {
        potency: {type: Number, required: true, default: defaultPotency},
        scalingStat: {type: String, required: true, default: defaultScaling},
        baseValue: {type: Number, required: true, default: defaultData}
    }
}
export interface _ITargetSpellCardData extends _IBaseSpellCardData {
    baseRange: {
        min: number,
        max: number,
        isMelee?: boolean
    },
    summonData?: {
        maxHealth: _ITargetSummonScaling,
        pDEF: _ITargetSummonScaling,
        mDEF: _ITargetSummonScaling,
        movement: _ITargetSummonScaling,
        dodge: _ITargetSummonScaling,
        simpleName: string,
        summonSize: string
    }
}

const TargetSpellCardSchema = new Schema<_ITargetSpellCardData>({
    baseRange: {
        min: {type: Number, required: true, default: 1},
        max: {type: Number, required: true, default: 2},
        isMelee: {type: Boolean, required: true, default: false}
    },
    summonData: {
        maxHealth: ITargetSummoningScaling(0, "spell.tetherCost", 1),
        pDEF: ITargetSummoningScaling(20, "none", 1),
        mDEF: ITargetSummoningScaling(0, "none", 1),
        movement: ITargetSummoningScaling(2, "none", 1),
        dodge: ITargetSummoningScaling(0, "none", 1),
        simpleName: String,
        summonSize: {type: String, required: true, default: "small"}
    }
})

TargetSpellCardSchema.add(AbstractSpellCardSchema)

const TargetSpellCardModel = mongoose.model('spells_target', TargetSpellCardSchema);
export default TargetSpellCardModel;