import mongoose from 'mongoose';
import {ESaveTypes} from "../../Enums/CardEnums";
import {EConsumableCraftingType, EConsumableType} from "../../Enums/EquipmentEnums";
import {IScalingData} from "../Cards/BaseWeaponCardModel";

export interface _IConsumable {
    itemName: string,
    itemType: string,
    craftingType: string,
    alchemistOnly: boolean,
    tetherCost: number,
    description: Array<string>,
    xVals: Array<{
        basePower: number,
        potency: number,
        skillScaling: string,
        abilityScaling: {
            modifiers?: Array<string>,
            multipliers?: Array<string>,
            overrides?: Array<string>
        }
    }>,
    slotCost: number,
    itemTier: number,
    itemCost: number,
    materialCost: number
}

const ConsumableSchema = new mongoose.Schema<_IConsumable>({
    itemName: {type: String, required: true, unique: true},
    itemType: {type: String, required: true, enum: EConsumableType},
    craftingType: {type: String, enum: EConsumableCraftingType},
    tetherCost: {type: Number, required: false},
    alchemistOnly: {type: Boolean, default: false},
    description: {type: [String], required: true},
    xVals: [
        {
            basePower: {type: Number, required: true, default: 0},
            potency: {type: Number, required: true, default: 0},
            skillScaling: {type: String, required: true, default: "none", enum: ESaveTypes},
            abilityScaling: {
                type: {
                    modifiers: [String],
                    multipliers: [String],
                    overrides: [String],
                },
                required: true,
                default: {}
            }
        }
    ],
    slotCost: {type: Number, required: true, default: 1},
    itemTier: {type: Number, required: true, default: 1},
    itemCost: {type: Number, required: true, default: 100},
    materialCost: {type: Number, required: true, default: 25}
})

const ConsumableModel = mongoose.model("consumables", ConsumableSchema);
export default ConsumableModel;