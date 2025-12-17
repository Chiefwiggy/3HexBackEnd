import mongoose, {Schema} from 'mongoose';
import AbstractTechnikCardSchema, {_IChannelData, _ITechnikCardData} from "./AbstractTechnikCardSchema";
import {EHackChannelTypes, ESaveTypes} from "../../Enums/CardEnums";

export interface _IProtocolTechnikCardData extends _ITechnikCardData, Document {
    saveType: string,
    baseHackSet: number
    protocolChannels: Array<_IChannelData>,
    isSummon: boolean,
    summonData: {
        pDEF: number,
        mDEF: number,
        movement: number,
        maxHealth: number,
        dodge: number,
        simpleName: string
    }
}



const ProtocolTechnikCardSchema = new Schema<_IProtocolTechnikCardData>({
    saveType: {type: String, required: false, enum: ESaveTypes, default: "none"},
    baseHackSet: {type: Number, required: true, default: 0},
    protocolChannels: [
        {
            channelType: {type: String, required: true, default: "machina", enum: EHackChannelTypes},
            channelStrength: {type: Number, required: true, default: 1}
        }
    ],
    isSummon: {type: Boolean, required: true, default: false},
    summonData: {
        pDEF: Number,
        mDEF: Number,
        movement: Number,
        maxHealth: Number,
        dodge: Number,
        simpleName: String
    }
})

ProtocolTechnikCardSchema.add(AbstractTechnikCardSchema);

const ProtocolTechnikCardModel = mongoose.model("hack_protocols", ProtocolTechnikCardSchema);

export default ProtocolTechnikCardModel;