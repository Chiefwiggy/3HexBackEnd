import mongoose from "mongoose"
import {_UPrerequisiteType, EHackSubtypes, EPrerequisiteTypes, ESaveTypes} from "../Enums/CardEnums";

export interface _IDatachipHackIdInterface {
    hackId: string,
    cardType: string
}

export interface _IDatachipSchema {
    datachipName: string
    baseTechnikCapacity: number,
    primaryTechnikScaling: number,
    secondaryTechnikScaling: number,
    primaryTechnikStat: string,
    secondaryTechnikStat: string,
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType
        skill: string,
        level: number
    }>,
    builtinHackIds: Array<_IDatachipHackIdInterface>,

    visibility: string
}

const DatachipSchema = new mongoose.Schema<_IDatachipSchema>( {
    datachipName: {type: String, required: true, unique: true},
    baseTechnikCapacity: {type: Number, required: true, default: 30},
    primaryTechnikScaling: {type: Number, required: true, default: 1.0},
    secondaryTechnikScaling: {type: Number, required: true, default: 0.0},
    primaryTechnikStat: {type: String, required: true, default: "knowledge", enum: ESaveTypes},
    secondaryTechnikStat: {type: String, required: true, default: "presence", enum: ESaveTypes},
    builtinHackIds: [
        {
            hackId: {type: String, required: true},
            cardType: {
                type: String,
                required: true,
                enum: EHackSubtypes
            }
        }
    ],
    prerequisites: [
        {
            prerequisiteType: {
                type: String,
                enum: EPrerequisiteTypes,
                required: true,
                default: "attribute"
            },
            skill: {type: String, required: true},
            level: {type: Number, required: true}
        }
    ],
    visibility: {type: String, required: true, default: "all", enum: ["all", "restricted", "admin"]}
})

const DatachipModel = mongoose.model("datachips", DatachipSchema);

export default DatachipModel;