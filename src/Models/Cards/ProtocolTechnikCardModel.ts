import mongoose, {Schema} from 'mongoose';
import AbstractTechnikCardSchema, {_ITechnikCardData} from "./AbstractTechnikCardSchema";
import {ESaveTypes} from "../../Enums/CardEnums";

export interface _IProtocolTechnikCardData extends _ITechnikCardData, Document {
    saveType: string,
    baseHackSet: number
}

const ProtocolTechnikCardSchema = new Schema<_IProtocolTechnikCardData>({
    saveType: {type: String, required: false, enum: ESaveTypes, default: "none"},
    baseHackSet: {type: Number, required: true, default: 0},
})

ProtocolTechnikCardSchema.add(AbstractTechnikCardSchema);

const ProtocolTechnikCardModel = mongoose.model("hack_protocols", ProtocolTechnikCardSchema);

export default ProtocolTechnikCardModel;