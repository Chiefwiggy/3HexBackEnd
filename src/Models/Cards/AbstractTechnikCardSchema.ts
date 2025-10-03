import mongoose, {Schema} from 'mongoose'
import AbstractCardSchema, {_IAbstractCardData} from "../Generics/AbstractCardSchema";

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

export interface _ITechnikCardData extends _IAbstractCardData {
    surgeCostMod?: _IDataModifiers
    durationMod?: _IDataModifiers,
    baseHackSetMod?: _IDataModifiers,
    hackSetMod?: _IDataModifiers,
    overrideSaveType?: string,
}

const AbstractTechnikCardSchema = new Schema({
    surgeCostMod: IDataModifiers,
    durationMod: IDataModifiers,
    baseHackSetMod: IDataModifiers,
    hackSetMod: IDataModifiers,
    overrideSaveType: String
}, {discriminatorKey: 'kind'})
AbstractTechnikCardSchema.add(AbstractCardSchema)

export default AbstractTechnikCardSchema