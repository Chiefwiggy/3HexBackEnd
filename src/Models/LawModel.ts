import mongoose from "mongoose";


export interface _ILawSchema extends mongoose.Document {
    lawName: string,
    lawDescription: Array<string>,
    tetherCost: number,
    castTime: string,
    materialComponents: Array<string>
}

const LawSchema = new mongoose.Schema<_ILawSchema>({
    lawName: {type: String, required: true, unique: true},
    lawDescription: {type: [String], required: true},
    tetherCost: {type: Number, required: true},
    castTime: String,
    materialComponents: [String]
})

const LawModel = mongoose.model("laws", LawSchema);

export default LawModel;