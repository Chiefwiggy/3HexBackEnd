import mongoose, {Document} from "mongoose";
import {_IDatachipHackIdInterface} from "./DatachipModel";
import {_UPrerequisiteType, EHackSubtypes, EPrerequisiteTypes} from "../Enums/CardEnums";

export interface _IPackageSchema extends Document {
    packageName: string,
    packageSlots: number,
    builtinHackIds: Array<_IDatachipHackIdInterface>
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType
        skill: string,
        level: number
    }>,
    visibility: string
}

const PackageSchema = new mongoose.Schema<_IPackageSchema>({
    packageName: {type: String, required: true, unique: true},
    packageSlots: {type: Number, required: true, default: 1},
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

const PackageModel = mongoose.model("packages", PackageSchema);

export default PackageModel;