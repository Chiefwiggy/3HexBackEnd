import mongoose, {Schema} from 'mongoose';
import AbstractTechnikCardSchema, {_ITechnikCardData} from "./AbstractTechnikCardSchema";

export interface _IIOTechnikCardData extends _ITechnikCardData, Document {
    baseRange: {
        min: number,
        max: number
    }
}

const IOTechnikCardSchema = new Schema<_IIOTechnikCardData>({
    baseRange: {
        min: {type: Number, required: true, default: 1},
        max: {type: Number, required: true, default: 2}
    }
})

IOTechnikCardSchema.add(AbstractTechnikCardSchema);

const IOTechnikCardModel = mongoose.model("hack_io", IOTechnikCardSchema);

export default IOTechnikCardModel;