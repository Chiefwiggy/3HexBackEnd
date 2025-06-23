import mongoose from "mongoose";
import {EConditionCountdownType, EConditionType} from "../Enums/ConditionEnums";


export interface _ICondition {
    conditionId: string,
    conditionName: string,
    conditionType: string
    conditionCountdownType: string,
    description: Array<string>,
    stackBonusDescription: string,
    inverseConditionId: string,
    xVals: Array<{
        basePower: number,
        tierScaling: number
    }>,
    conditionTier: number
}

const ConditionSchema = new mongoose.Schema<_ICondition>({
    conditionId: {type: String, required: true, unique: true},
    conditionName: {type: String, required: true, unique: true},
    conditionType: {type: String, required: true, enum: EConditionType},
    conditionCountdownType: {type: String, required: true, enum: EConditionCountdownType},
    description: {type: [String], required: true},
    stackBonusDescription: {type: String, required: true},
    inverseConditionId: String,
    xVals: [
        {
            basePower: {type: Number, required: true, default: 0},
            tierScaling: {type: Number, required: true, default: 0}
        }
    ],
    conditionTier: {type: Number, default: 1}
})

const ConditionModel = mongoose.model("conditions", ConditionSchema);

export default ConditionModel