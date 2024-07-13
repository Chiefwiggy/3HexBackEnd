import mongoose, {Schema} from 'mongoose';
import {_UPrerequisiteType, EActionType, EPrerequisiteTypes, ERefreshTypes} from "../Enums/CardEnums";

export interface _IAbilityModel extends Document {
    abilityName: string,
    prerequisites: Array<{
        prerequisiteType: _UPrerequisiteType,
        skill: string,
        level: number
    }>,
    description: Array<string>,
    isUltimate?: boolean,
    isPassive: boolean,
    uses: number,
    actionType: string,
    abilityRefreshTime: string,
    bonuses: {
        affinity?: {
            hex?: number,
            rune?: number,
            soul?: number,
            deft?: number,
            infantry?: number,
            guardian?: number,
            leadership?: number,
            erudite?: number,
            supply?: number,
            biohacking?: number,
            abjuration?: number,
            machinery?: number
        },
        arcana?: {
            arcane?: number,
            warrior?: number,
            support?: number,
            hacker?: number
        }
        pDEF?: number,
        mDEF?: number,
        maxStamina?: number,
        maxHealth?: number,
        maxTether?: number,
        cardSlots?: number,
        critDamage?: number,
        expertiseDice?: number,
        weaponRequirement?: number,
        weaponPrestigeRequirement?: number,
        quickSlots?: number
    },
    unlocks: {
        unarmoredDefense?: boolean
    }

}

const AbilitySchema = new Schema<_IAbilityModel>({
    abilityName: {type: String, required: true, unique: true},
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
    isUltimate: {type: Boolean, default: false},
    isPassive: {type: Boolean, default: true, required: true},
    description: {type: [String], required: true},
    uses: {type: Number, required: true, default: 0},
    actionType: {type: String, enum: EActionType, required: false},
    abilityRefreshTime: {type: String, required: true, enum: ERefreshTypes, default: "passive"},
    bonuses: {
        type: {
            affinity: {
                hex: Number,
                rune: Number,
                soul: Number,
                deft: Number,
                infantry: Number,
                guardian: Number,
                leadership: Number,
                erudite: Number,
                supply: Number,
                biohacking: Number,
                abjuration: Number,
                machinery: Number
            },
            arcana: {
                arcane: Number,
                warrior: Number,
                support: Number,
                hacker: Number
            },
            pDEF: Number,
            mDEF: Number,
            maxHealth: Number,
            maxStamina: Number,
            maxTether: Number,
            cardSlots: Number,
            critDamage: Number,
            expertiseDice: Number,
            weaponRequirement: Number,
            weaponPrestigeRequirement: Number,
            quickSlots: Number
        },
        required: true,
        default: {}
    },
    unlocks: {
        type: {
            unarmoredDefense: Boolean
        },
        required: true,
        default: {}
    }
})

const AbilityModel = mongoose.model('abilities', AbilitySchema);

export default AbilityModel;