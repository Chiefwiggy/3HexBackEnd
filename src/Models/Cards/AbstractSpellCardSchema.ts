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

export interface _ISpellCardData extends _IAbstractCardData {
    castTimeMod?: _IDataModifiers,
    durationMod?: _IDataModifiers,
    tetherCostMod?: _IDataModifiers,
    energyCostMod?: _IDataModifiers,
    baseSpellSetMod?: _IDataModifiers,
    spellSetMod?: _IDataModifiers,
    forceMelee?: boolean,
    forceRange?: boolean
}


const AbstractSpellCardSchema = new Schema({
    castTimeMod: IDataModifiers,
    durationMod: IDataModifiers,
    tetherCostMod: IDataModifiers,
    energyCostMod: IDataModifiers,
    baseSpellSetMod: IDataModifiers,
    spellSetMod: IDataModifiers,
    forceMelee: {type: Boolean, default: false},
    forceRange: {type: Boolean, default: false},
}, {discriminatorKey: 'kind'})
AbstractSpellCardSchema.add(AbstractCardSchema)

export default AbstractSpellCardSchema