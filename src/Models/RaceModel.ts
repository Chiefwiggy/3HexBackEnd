import mongoose from "mongoose";


export interface _IRaceData extends Document {
    raceName: string,
    raceId: string,
    raceDescription: string,
    availableRoles: Array<string>
}

const RaceSchema = new mongoose.Schema<_IRaceData>({
    raceName: {type: String, required: true},
    raceDescription: {type: String, required: true},
    availableRoles: {
        type: [String],
        required: true
    }
})