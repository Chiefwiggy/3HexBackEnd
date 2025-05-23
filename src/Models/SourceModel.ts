import mongoose, {Document} from 'mongoose';
import {EArcanotype} from '../Enums/CardEnums'

export interface _ITierData {
    layer: number,
    cardType: string,
    cardId: string,
    arcaneRequirement: number,
    isSecret: boolean
}

export interface _ISourceSchema extends Document {
    sourceName: string,
    sourceArcanotype: string,
    sourceTier: number,
    lawId: string | null,
    sourceTiers: Array<_ITierData>,
    visibility: string,
    onlyTemporary: boolean,
    neverTemporary: boolean
}

const SourceSchema = new mongoose.Schema<_ISourceSchema>({
    sourceName: {type: String, required: true, unique: true},
    sourceArcanotype: {type: String, required: true, enum: EArcanotype},
    sourceTier: {type: Number, required: true, default: 1},
    lawId: String,
    sourceTiers: [
        {
            layer: {type: Number, required: true},
            cardType: {type: String, enum: ["base", "edict", "order"], required: true, default: "base"},
            cardId: {type: String, required: true},
            communionRequirement: {type: Number, required: false, default: 0},
            isSecret: Boolean,
            isObscuredUntilUnlocked: Boolean
        }
    ],
    visibility: {type: String, required: true, default: "all", enum: ["all", "restricted", "admin"]},
    onlyTemporary: {type: Boolean, default: false, required: true},
    neverTemporary: {type: Boolean, default: false, required: true}
});

const SourceModel = mongoose.model('sources', SourceSchema);

export default SourceModel;