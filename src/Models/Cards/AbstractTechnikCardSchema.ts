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

}

const AbstractTechnikCardSchema = new Schema({}, {discriminatorKey: 'kind'})
AbstractTechnikCardSchema.add(AbstractCardSchema)

export default AbstractTechnikCardSchema