import mongoose from "mongoose";


export interface _IRaceData extends Document {
    raceName: string,
    raceId: string,
    raceDescription: string,
    availableSubraces: Array<{
        subraceName: string,
        subraceId: string,
        subraceDescription: string,
        cdnImageLink: string
    }>
    availableRoles: Array<string>
}

const RaceSchema = new mongoose.Schema<_IRaceData>({
    raceName: {type: String, required: true},
    raceDescription: {type: String, required: true},
    raceId: {type: String, required: true},
    availableSubraces: [
        {
            subraceName: {type: String, required: true},
            subraceId: {type: String, required: true},
            subraceDescription: String,
            cdnImageLink: String
        }
    ],
    availableRoles: {
        type: [String],
        required: true
    }
})

const RaceModel = mongoose.model('races', RaceSchema)

export default RaceModel;