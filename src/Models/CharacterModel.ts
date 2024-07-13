import mongoose, {Schema} from "mongoose";
import {EEmblemType, ESkill} from "../Enums/CardEnums";


const IModifiable = {
    value: { type: Number, required: true },
    modifiers: {
        modifier: {type: Number, required: false, default: undefined},
        multiplier: {type: Number, required: false, default: undefined},
        override: {type: Number, required: false, default: undefined}
    }
}

const IAttributeBar = {
    current: {type: Number, default: 0},
    scaling: IModifiable,
}


interface _IModifiable {
    value: number,
    modifiers: {
        modifier: number,
        multiplier: number,
        override: number
    }
}

interface _IAttributeBar {
    current: number,
    scaling: _IModifiable
}

export interface _IAttributes {
    might: _IModifiable,
    agility: _IModifiable,
    skill: _IModifiable,
    awareness: _IModifiable,
    vitality: _IModifiable,
    knowledge: _IModifiable,
    mind: _IModifiable,
    presence: _IModifiable,
    authority: _IModifiable,
    endurance: _IModifiable
}

export interface _IAffinities {
    hex: number,
    rune: number,
    soul: number,
    deft: number,
    infantry: number,
    guardian: number,
    leadership: number,
    erudite: number,
    supply: number,
    biohacking: number,
    abjuration: number,
    machinery: number
}

export interface _ICalculatedWeapon {
        customName?: string,
        weaponBaseId: string,
        weaponCardsIds: Array<string>
}

export interface _ICalculatedSpell {
    customName?: string,
    spellBaseId: string,
    spellTargetId: string,
    spellSkillsIds: Array<string>
}


export interface _ICharacterData extends Document {
    characterName: string,
    characterLevel: number,
    classes: Array<{
        className: string,
        affinities: _IAffinities,
        classExpertises: Array<string>,
        downtimeActivities: Array<string>,
        classTier: number
    }>,
    attributeBars: {
        health: _IAttributeBar,
        stamina: _IAttributeBar,
        tether: _IAttributeBar
    },
    characterStats: _IAttributes,
    movement: {
        stepSpeed: _IModifiable,
        dashSpeed: _IModifiable,
        canClimb: boolean,
        canFly: boolean,
        canSwim: boolean
    },
    bonuses: {
        staminaRefresh: number,
        tetherRefresh: number,
        maxHealth: number,
        maxStamina: number,
        maxTether: number,
        expertiseDice: number,
        hitBonus: number,
        critBonus: number
    },
    preparedCards: Array<string>,
    preparedCommanderCards: Array<string>,
    createdSpells: Array<_ICalculatedSpell>,
    createdWeapons: Array<_ICalculatedWeapon>,
    currentSpell: _ICalculatedSpell,
    currentWeapon: _ICalculatedWeapon,
    currentArmorId: string,
    knownWeapons: Array<string>,
    knownBaseSpells: Array<string>,
    skillPoints: {
        athletics: number,
        handling: number,
        stealth: number,
        deduction: number,
        identify: number,
        science: number,
        technology: number,
        biology: number,
        metaphysics: number,
        spellcraft: number,
        survival: number,
        perception: number,
        streetwise: number,
        discovery: number,
        diplomacy: number,
        hostility: number,
        guile: number,
        lore: number,
        occult: number,
        society: number
    }
}

const CharacterSchema = new mongoose.Schema<_ICharacterData>({
    characterName: { type: String, required: true, unique: true},
    characterLevel: { type: Number, required: true },
    classes: [
        {
            className: { type: String, required: true },
            affinities: {
                hex: { type: Number, required: false, default: 0},
                rune: {type: Number, required: false, default: 0},
                soul: {type: Number, required: false, default: 0},
                deft: {type: Number, required: false, default: 0},
                infantry: {type: Number, required: false, default: 0},
                guardian: {type: Number, required: false, default: 0},
                leadership: {type: Number, required: false, default: 0},
                erudite: {type: Number, required: false, default: 0},
                supply: {type: Number, required: false, default: 0},
                biohacking: {type: Number, required: false, default: 0},
                abjuration: {type: Number, required: false, default: 0},
                machinery: {type: Number, required: false, default: 0},
            },
            classExpertises: [
                {
                    type: String,
                    enum: ESkill,
                    required: true,
                    default: "Athletics"
                }
            ],
            downtimeActivities: [
                {
                    type: String,
                    required: true,
                    default: "Hemocraft Kit"
                }
            ],
            classTier: {type: Number, required: true, default: 1}
        }
    ],
    attributeBars: {
        health: IAttributeBar,
        stamina: IAttributeBar,
        tether: IAttributeBar,
    },
    characterStats: {
        might: IModifiable,
        agility: IModifiable,
        skill: IModifiable,
        awareness: IModifiable,
        vitality: IModifiable,
        knowledge: IModifiable,
        mind: IModifiable,
        presence: IModifiable,
        authority: IModifiable,
        endurance: IModifiable
    },
    movement: {
        stepSpeed: IModifiable,
        dashSpeed: IModifiable,
        canClimb: { type: Boolean, required: false, default: false },
        canFly: { type: Boolean, required: false, default: false },
        canSwim: { type: Boolean, required: false, default: false },
    },
    bonuses: {
        staminaRefresh: { type: Number, required: false, default: 0},
        tetherRefresh: { type: Number, required: false, default: 0},
        maxHealth: { type: Number, required: false, default: 0},
        maxStamina: { type: Number, required: false, default: 0},
        maxTether: { type: Number, required: false, default: 0},
        expertiseDice: { type: Number, required: false, default: 0},
        hitBonus: { type: Number, required: false, default: 0},
        critBonus: { type: Number, required: false, default: 0},
    },
    preparedCards: [String],
    preparedCommanderCards: [String],
    createdSpells: [
        {
            customName: {type: String, required: false},
            spellBaseId: {type: String, required: true},
            spellTargetId: {type: String, required: true},
            spellSkillsIds: [String]
        }
    ],
    createdWeapons: [
        {
            customName: {type: String, required: false},
            weaponBaseId: {type: String, required: true},
            weaponCardsIds: [String]
        }
    ],
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
    currentWeapon: {
        type: {
            customName: {type: String, required: false},
            weaponBaseId: {type: String, required: true},
            weaponCardsIds: [String]
        },
        required: false,
        default: null
    },
    currentArmorId: String,
    knownBaseSpells: [String],
    knownWeapons: [String],
    skillPoints: {
        type: {
            athletics: {type: Number, default: 0, required: true},
            handling: {type: Number, default: 0, required: true},
            stealth: {type: Number, default: 0, required: true},
            deduction: {type: Number, default: 0, required: true},
            identify: {type: Number, default: 0, required: true},
            science: {type: Number, default: 0, required: true},
            technology: {type: Number, default: 0, required: true},
            biology: {type: Number, default: 0, required: true},
            metaphysics: {type: Number, default: 0, required: true},
            spellcraft: {type: Number, default: 0, required: true},
            survival: {type: Number, default: 0, required: true},
            perception: {type: Number, default: 0, required: true},
            streetwise: {type: Number, default: 0, required: true},
            discovery: {type: Number, default: 0, required: true},
            diplomacy: {type: Number, default: 0, required: true},
            hostility: {type: Number, default: 0, required: true},
            guile: {type: Number, default: 0, required: true},
            lore: {type: Number, default: 0, required: true},
            occult: {type: Number, default: 0, required: true},
            society: {type: Number, default: 0, required: true}
        },
        required: true
    }
})

const CharacterModel = mongoose.model('characters', CharacterSchema);
export default CharacterModel;