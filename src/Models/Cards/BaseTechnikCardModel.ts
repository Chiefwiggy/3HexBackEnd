import AbstractTechnikCardSchema, {_ITechnikCardData} from "./AbstractTechnikCardSchema";
import mongoose, {Schema} from 'mongoose'
import {EDamageSubtypes, EDamageTypes, ESaveTypes} from "../../Enums/CardEnums";



export interface _IBaseTechnikCardData extends _ITechnikCardData, Document {
    technikCost: number,
    basePower: number,
    potency: number,
    duration: number,
    tetherCost: number,
    staminaCost: number,
    damageType: string,
    damageSubtype: string,
    functionalName: string,
    baseSurge: number
}

const BaseTechnikCardSchema = new Schema<_IBaseTechnikCardData>({
    technikCost: {type: Number, required: true},
    basePower: {type: Number, required: true},
    potency: {type: Number, required: true},
    duration: {type: Number, required: true, default: 2},
    tetherCost: {type: Number, required: false},
    staminaCost: {type: Number, required: false},
    damageType: {
        type: String,
        enum: EDamageTypes,
        required: true,
        default: "none"
    },
    damageSubtype: {
        type: String,
        enum: EDamageSubtypes,
        required: true,
        default: "none"
    },
    functionalName: {type: String, required: true},
    baseSurge: {type: Number, required: true, default: 0}
})

BaseTechnikCardSchema.add(AbstractTechnikCardSchema);

const BaseTechnikCardModel = mongoose.model<_IBaseTechnikCardData>("hack_functions", BaseTechnikCardSchema);


export default BaseTechnikCardModel;