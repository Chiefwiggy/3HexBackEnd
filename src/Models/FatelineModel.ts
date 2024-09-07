import mongoose, {Document} from "mongoose";
import {_IChoiceData, MChoiceData} from "./ClassModel";
import {EFatelines} from "../Enums/CharacterEnums";


export interface _IFatelineData extends Document {
    fatelineName: string,
    fatelineId: string,
    fatelineNumber: number,
    upright: {
        fatelineDescription: [string],
        affinityChoices: {
            choices: Array<_IChoiceData>,
            amount: number
        }
    },
    reversed: {
        fatelineDescription: [string],
        affinityChoices: {
            choices: Array<_IChoiceData>,
            amount: number
        }
    }

}

const FatelineSchema = new mongoose.Schema<_IFatelineData>({
    fatelineName: {type: String, required: true},
    fatelineId: {type: String, required: true, unique: true, enum: EFatelines},
    fatelineNumber: {type: Number, required: true, unique: true},
    upright: {
        fatelineDescription: {type: [String], required: true},
        affinityChoices: {
            choices: [MChoiceData],
            amount: {type: Number, required: true, default: 1}
        }
    },
    reversed: {
        fatelineDescription: {type: [String], required: true},
        affinityChoices: {
            choices: [MChoiceData],
            amount: {type: Number, required: true, default: 1}
        }
    }
});

const FatelineModel = mongoose.model('fatelines', FatelineSchema);

export default FatelineModel;