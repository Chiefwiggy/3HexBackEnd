import mongoose, {Schema, Document} from 'mongoose'
import {EChoiceType, EChoiceLabel} from "../Enums/CharacterEnums";
import {_UPrerequisiteType, EPrerequisiteTypes} from "../Enums/CardEnums";

interface _IChoiceData {
    choiceType: string,
    choiceName: string,
    choiceAmount: number
}
export interface _IClassModel extends Document {
    className: string,
    description: string,
    choices: {
        baseChoice: {
            choices: Array<_IChoiceData>,
            amount: number
        },
        prestigeChoice: {
            choices: Array<_IChoiceData>,
            amount: number
        }
    },
    classExpertises: Array<string>,
    downtimeActivities: Array<string>,
    classTier: number,
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType,
        skill: string,
        level: number
    }>,
}

const MChoiceData = {
    choiceType: {
        type: String,
        enum: EChoiceType,
        required: true
    },
    choiceName: {
        type: String,
        enum: EChoiceLabel,
        required: true
    },
    choiceAmount: { type: Number, required: true, default: 1}
}

const ClassSchema = new Schema<_IClassModel>({
    className: { type: String, required: true, unique: true},
    description: {type: String, required: true, default: ""},
    choices: {
        baseChoice: {
            choices: [MChoiceData],
            amount: {type: Number, required: true, default: 1}
        },
        prestigeChoice: {
            choices: [MChoiceData],
            amount: {type: Number, required: true, default: 1}
        }
    },
    classExpertises: [String],
    downtimeActivities: [String],
    classTier: {type: Number, required: true, default: 1},
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
})

const ClassModel = mongoose.model<_IClassModel>('classes', ClassSchema);

export default ClassModel;