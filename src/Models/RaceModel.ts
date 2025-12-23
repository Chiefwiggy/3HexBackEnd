import mongoose from "mongoose";
import {EDamageSubtypes} from "../Enums/CardEnums";


export interface _IRaceData extends Document {
    raceName: string,
    raceId: string,
    raceDescription: string,
    availableSubraces: Array<{
        subraceName: string,
        subraceId: string,
        subraceDescription: string,
        cdnImageLink: string,
        innateResistances: Array<string>,
        innateVulnerabilities: Array<string>,
        subraceRoles: Array<string>
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
            cdnImageLink: String,
            innateResistances: {type: [String], required: true, enum: EDamageSubtypes},
            innateVulnerabilities: {type: [String], required: true, enum: EDamageSubtypes},
            innateImmunities: {type: [String], required: false, enum: EDamageSubtypes},
            subraceRoles: {type: [String], required: true, default: []}
        }
    ],
    availableRoles: {
        type: [String],
        required: true
    }
})

const RaceModel = mongoose.model('races', RaceSchema)

export default RaceModel;