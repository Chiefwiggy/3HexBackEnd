import mongoose, {Document, Schema} from 'mongoose'
import {
    _ICalculatedSpell,
    _ICalculatedWeapon,
    _IEnchantmentData,
    _IPreparedSource,
    IPreparedSource
} from "./CharacterModel";



export interface _IMinionSchema_New extends Document {
    minionName: string,
    isNamedMinion: boolean,
    minionLevel: number,
    minionRoles: Array<string>,
    minionStats: {
        might: number,
        technique: number,
        toughness: number
    },
    armorData?: _IEnchantmentData,
    currentWeapon?: _ICalculatedWeapon,
    currentSpell?: _ICalculatedSpell,
    knownSources: Array<_IPreparedSource>
    downtimeSkill: string,
    primarySkill: string,
    secondarySkill: string,
    tertiarySkill: string,
}
const MinionSchema_New = new mongoose.Schema<_IMinionSchema_New>({
    minionName: {type: String, required: true, unique: true},
    isNamedMinion: {type: Boolean, required: true, default: false},
    minionLevel: {type: Number, required: true, default: 1},
    minionRoles: {type: [String], required: true},
    minionStats: {
        might: {type: Number, required: true, default: 0},
        technique: {type: Number, required: true, default: 0},
        toughness: {type: Number, required: true, default: 0}
    },
    armorData: {
        type: {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0},
            improvements: {type: Number, default: 0},
            efficientUse: {type: Boolean, default: false}
        },
        required: false
    },
    currentWeapon: {
        type: {
            customName: {type: String, required: false},
            weaponBaseData: {
                baseId: {type: String, required: true},
                enchantmentLevel: {type: Number, required: true, default: 0},
                improvements: Number,
                efficientUse: Boolean
            },
            weaponCardsIds: [String]
        },
        required: false,
        default: null
    },
    currentSpell: {
        type: {
            customName: {type: String, required: false},
            spellBaseId: {type: String, required: true},
            spellTargetId: {type: String, required: true},
            spellSkillsIds: [String]
        },
        required: false,
        default: null
    },
    knownSources: [IPreparedSource],
    downtimeSkill: {type: String, required: true, default: "none"},
    primarySkill: {type: String, required: true, default: "none"},
    secondarySkill: {type: String, required: true, default: "none"},
    tertiarySkill: {type: String, required: true, default: "none"}
})

const MinionModel_New = mongoose.model("minions_new", MinionSchema_New);

export default MinionModel_New