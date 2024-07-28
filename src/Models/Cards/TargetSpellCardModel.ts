import mongoose, {Schema} from "mongoose";
import AbstractSpellCardSchema from "./AbstractSpellCardSchema";
import {_IBaseSpellCardData} from "./BaseSpellCardModel";

export interface _ITargetSpellCardData extends _IBaseSpellCardData {
    baseRange: {
        min: number,
        max: number,
        isMelee?: boolean
    }
}

const TargetSpellCardSchema = new Schema<_ITargetSpellCardData>({
    baseRange: {
        min: {type: Number, required: true, default: 1},
        max: {type: Number, required: true, default: 2},
        isMelee: {type: Boolean, required: true, default: false}
    }
})

TargetSpellCardSchema.add(AbstractSpellCardSchema)

const TargetSpellCardModel = mongoose.model('spells_target', TargetSpellCardSchema);
export default TargetSpellCardModel;