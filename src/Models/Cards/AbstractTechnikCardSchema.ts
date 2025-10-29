import mongoose, {Schema} from 'mongoose'
import AbstractCardSchema, {_IAbstractCardData} from "../Generics/AbstractCardSchema";
import {EHackChannelTypes} from "../../Enums/CardEnums";

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

export interface _IChannelData {
    channelType: string,
    channelStrength: number
}

export interface _ITechnikCardData extends _IAbstractCardData {
    surgeCostMod?: _IDataModifiers
    durationMod?: _IDataModifiers,
    baseHackSetMod?: _IDataModifiers,
    hackSetMod?: _IDataModifiers,
    channelRequirements?: Array<_IChannelData>,
    overrideSaveType?: string,
}

const AbstractTechnikCardSchema = new Schema({
    surgeCostMod: IDataModifiers,
    durationMod: IDataModifiers,
    baseHackSetMod: IDataModifiers,
    hackSetMod: IDataModifiers,
    channelRequirements:  [
        {
            channelType: {type: String, required: true, default: "machina", enum: EHackChannelTypes},
            channelStrength: {type: Number, required: true, default: 1}
        }
    ],
    overrideSaveType: String
}, {discriminatorKey: 'kind'})
AbstractTechnikCardSchema.add(AbstractCardSchema)

export default AbstractTechnikCardSchema