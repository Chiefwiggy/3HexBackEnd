import mongoose from 'mongoose';
import {ESaveTypes} from "../../Enums/CardEnums";
import {EConsumableType} from "../../Enums/EquipmentEnums";

export interface _IConsumable {
    itemName: string,
    basePower: number,
    potency: number,
    skillScaling: string,
    tetherCost?: number,
    itemType: string,
    description: Array<string>,
    slotCost: number,
    itemTier: number,
    itemBaseHealth?: number
}

const ConsumableSchema = new mongoose.Schema<_IConsumable>({
    itemName: {type: String, required: true, unique: true},
    basePower: {type: Number, required: true, default: 0},
    potency: {type: Number, required: true, default: 0},
    skillScaling: {type: String, required: true, default: "none", enum: ESaveTypes},
    tetherCost: {type: Number, required: false},
    itemType: {type: String, required: true, enum: EConsumableType},
    description: {type: [String], required: true},
    slotCost: {type: Number, required: true, default: 1},
    itemTier: {type: Number, required: true, default: 1},
    itemBaseHealth: Number
})

const ConsumableModel = mongoose.model("consumables", ConsumableSchema);
export default ConsumableModel;