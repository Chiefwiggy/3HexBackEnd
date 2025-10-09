import mongoose, {Schema} from "mongoose";
import {EEmblemType, ESkill} from "../Enums/CardEnums";
import {EFatelines, ERaceRole} from "../Enums/CharacterEnums";


export const IModifiable = {
    value: { type: Number, required: true },
    modifiers: {
        modifier: {type: Number, required: false, default: undefined},
        multiplier: {type: Number, required: false, default: undefined},
        override: {type: Number, required: false, default: undefined}
    }
}

const IPreparedCardList = [
    {
        cardId: { type: String, required: true },
        additionalData: {type: Schema.Types.Mixed, default: {}}
    }
]

const IPreparedCard = {
    cardId: { type: String, required: true },
    additionalData: {type: Number, default: 0}
}

export const IPreparedSource = {
    sourceId: { type: String, required: true },
    attunementLevel: {type: Number, required: true, default: 0}
}

export const IAttributeBar = {
    current: {type: Number, default: 0},
    scaling: IModifiable,
}


export interface _IModifiable {
    value: number,
    modifiers: {
        modifier: number,
        multiplier: number,
        override: number
    }
}

export interface _IAttributeBar {
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
    nimble: number,
    infantry: number,
    guardian: number,
    focus: number,
    creation: number,
    alteration: number,
    leadership: number,
    supply: number,
    summoning: number,
    swift: number,
    riding: number,
    adaptation: number,
    rune: number,
    sourcecraft: number,
    research: number,
    machinery: number,
    abjuration: number,
    biohacking: number
}

export interface _ISkills {
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

export interface _ICalculatedWeapon {
        customName?: string,
        weaponBaseData: _IEnchantmentData,
        weaponCardsIds: Array<string>
}

export interface _ICalculatedHack {
    customName?: string,
    hackFunctionId: string,
    hackIOId: string,
    hackProtocolId: string,
    hackCardsIds: Array<string>
}

export interface _IEnchantmentData {
    baseId: string,
    enchantmentLevel: number,
    improvements?: number,
    efficientUse?: boolean
}

export interface _ICalculatedSpell {
    customName?: string,
    spellBaseId: string,
    spellTargetId: string,
    spellSkillsIds: Array<string>
}

export interface _IKnownArmorStruct {
    baseId: string,
    enchantmentLevel: number
}

export interface _IKnownWeaponStruct {
        baseId: string,
        enchantmentLevel: number
}

export interface _IPreparedCard {
    cardID: string,
    additionalData?: Object
}

export interface _IPreparedSource {
    sourceId: string,
    attunementLevel: number
}

export interface _IEquippedConsumable {
    consumableId: string,
    prepared: number,
    amount: number
}

export interface _IDowntimePlayerData {
    activityId: string,
    currentProgress: number,
    proficiency: number
}

export interface _IMinionSpecificData {
    minionName: string,
    minionTemplateId: string,
    minionXP: number,
    minionStatBonuses: {
        might: _IModifiable,
        agility: _IModifiable,
        skill: _IModifiable,
        awareness: _IModifiable,
        vitality: _IModifiable,
        knowledge: _IModifiable,
        mind: _IModifiable,
        presence: _IModifiable,
        command: _IModifiable,
        endurance: _IModifiable
    },
    attributeBars: {
        health: _IAttributeBar,
        stamina: _IAttributeBar,
        tether: _IAttributeBar,
        orders: _IAttributeBar,
        technik: _IAttributeBar
    },
    bonuses: Object
}


export interface _ICharacterData extends Document {
    characterName: string,
    characterLevel: number,
    isMainCharacter: boolean,
    classes: Array<{
        className: string,
        affinities: _IAffinities,
        classExpertises: Array<string>,
        classTier: number,
        isPromoted: boolean
    }>,
    downtimeData: Array<_IDowntimePlayerData>,
    fateline: {
        fatelineName: string,
        fatelineId: string,
        affinities: _IAffinities,
        isReversed: boolean
    },
    race: {
        raceId: string,
        raceRoles: Array<string>,
        pointsSpentOn: Array<string>
        subraceId: string,
    },
    specialId: string,
    attributeBars: {
        health: _IAttributeBar,
        stamina: _IAttributeBar,
        tether: _IAttributeBar,
        orders: _IAttributeBar,
        technik: _IAttributeBar
    },
    currentActionPoints: number,
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
    preparedCards: Array<_IPreparedCard>,
    preparedCommanderCards: Array<string>,
    createdSpells: Array<_ICalculatedSpell>,
    createdWeapons: Array<_ICalculatedWeapon>,
    createdHacks: Array<_ICalculatedHack>,
    currentSpell: _ICalculatedSpell,
    currentWeapon: _ICalculatedWeapon,
    currentHack: _ICalculatedHack,
    currentOffhandWeapon: _ICalculatedWeapon,
    counterWeapon: _ICalculatedWeapon,
    currentArmor: _IKnownArmorStruct,
    currentShield: _IKnownArmorStruct,
    knownConsumables: Array<_IEquippedConsumable>,
    knownArmor: Array<_IKnownArmorStruct>,
    knownShield: Array<_IKnownArmorStruct>,
    knownWeapons: Array<_IKnownWeaponStruct>,
    knownBaseSpells: Array<string>,
    knownSources: Array<_IPreparedSource>,
    temporarySources: Array<_IPreparedSource>,
    characterImageKey: string,
    skillPoints: _ISkills,
    minionsOwned: Array<{
        minionId: string,
        isEquipped: boolean,
        equippedAs: string
    }>,
    minionData: Array<_IMinionSpecificData>,
    isDead: boolean,
    creatorName: string,
    campaignIds: Array<string>,
    settings: {
        dieColorId: string,
        showAttributeDescriptions: boolean
    },
    developmentIds: Array<string>,
    __times_accessed: number,

}

const CharacterSchema = new mongoose.Schema<_ICharacterData>({
    characterName: { type: String, required: true, unique: true},
    characterLevel: { type: Number, required: true },
    isMainCharacter: {type: Boolean, required: true, default: false},
    classes: [
        {
            className: { type: String, required: true },
            affinities: {
                nimble: { type: Number, required: false, default: 0 },
                infantry: { type: Number, required: false, default: 0 },
                guardian: { type: Number, required: false, default: 0 },
                focus: { type: Number, required: false, default: 0 },
                creation: { type: Number, required: false, default: 0 },
                alteration: { type: Number, required: false, default: 0 },
                leadership: { type: Number, required: false, default: 0 },
                supply: { type: Number, required: false, default: 0 },
                summoning: { type: Number, required: false, default: 0 },
                swift: { type: Number, required: false, default: 0 },
                riding: { type: Number, required: false, default: 0 },
                adaptation: { type: Number, required: false, default: 0 },
                rune: { type: Number, required: false, default: 0 },
                sourcecraft: { type: Number, required: false, default: 0 },
                research: { type: Number, required: false, default: 0 },
                machinery: { type: Number, required: false, default: 0 },
                abjuration: { type: Number, required: false, default: 0 },
                biohacking: { type: Number, required: false, default: 0 }
            },
            classExpertises: [
                {
                    type: String,
                    enum: ESkill,
                    required: true,
                    default: "Athletics"
                }
            ],
            classTier: {type: Number, required: true, default: 1},
            isPromoted: {type: Boolean, required: true, default: false}
        }
    ],
    downtimeData: {
      type: [
          {
              activityId: {type: String, required: true},
              currentProgress: {type: Number, required: true, default: 0},
              proficiency: {type: Number, required: true, default: 0}
          }
      ]
    },
    fateline: {
        type: {
            fatelineName: {type: String, required: true, default: "The Fool"},
            fatelineId: {type: String, required: true, enum: EFatelines, default: "fool"},
            affinities: {
                nimble: { type: Number, required: false, default: 0 },
                infantry: { type: Number, required: false, default: 0 },
                guardian: { type: Number, required: false, default: 0 },
                focus: { type: Number, required: false, default: 0 },
                creation: { type: Number, required: false, default: 0 },
                alteration: { type: Number, required: false, default: 0 },
                leadership: { type: Number, required: false, default: 0 },
                supply: { type: Number, required: false, default: 0 },
                summoning: { type: Number, required: false, default: 0 },
                swift: { type: Number, required: false, default: 0 },
                riding: { type: Number, required: false, default: 0 },
                adaptation: { type: Number, required: false, default: 0 },
                rune: { type: Number, required: false, default: 0 },
                sourcecraft: { type: Number, required: false, default: 0 },
                research: { type: Number, required: false, default: 0 },
                machinery: { type: Number, required: false, default: 0 },
                abjuration: { type: Number, required: false, default: 0 },
                biohacking: { type: Number, required: false, default: 0 }
            },
            isReversed: {type: Boolean, required: true, default: false}
        },
        required: false
    },
    race: {
        raceId: {type: String, required: true, default: "_"},
        raceRoles: {type: [String], required: true, default: []},
        pointsSpentOn: {type: [String], required: true, default: []},
        subraceId: {type: String, required: false},
    },
    specialId: String,
    attributeBars: {
        health: IAttributeBar,
        stamina: IAttributeBar,
        tether: IAttributeBar,
        orders: IAttributeBar,
        technik: IAttributeBar
    },
    currentActionPoints: {type: Number, required: true, default: 0},
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
    preparedCards: [
        {
            cardId: { type: String, required: true },
            additionalData: {type: Schema.Types.Mixed, default: {}}
        }
    ],
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
            weaponBaseData: {
                baseId: {type: String, required: true}
            },
            weaponCardsIds: [String]
        }
    ],
    createdHacks: [
        {
            customName: {type: String, required: false},
            hackFunctionId: {type: String, required: true},
            hackIOId: {type: String, required: true},
            hackProtocolId: {type: String, required: true},
            hackCardsIds: [String]
        }
    ],
    currentHack: {
        type: {
            customName: {type: String, required: false},
            hackFunctionId: {type: String, required: true},
            hackIOId: {type: String, required: true},
            hackProtocolId: {type: String, required: true},
            hackCardsIds: [String]
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
    currentOffhandWeapon: {
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
    currentArmor: {
        type: {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0}
        },
        required: false,
        default: null
    },
    currentShield: {
        type: {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0}
        },
        required: false,
        default: null
    },
    knownConsumables: [
        {
            consumableId: {type: String, required: true},
            amount: {type: Number, required: true, default: 0},
            prepared: {type: Number, required: true, default: 0}
        }
    ],
    knownArmor: [
        {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0}
        }
    ],
    knownShield: [
        {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0}
        }
    ],
    counterWeapon: {
        type: {
            customName: {type: String, required: false},
            weaponBaseData: {
                baseId: {type: String, required: true},
                enchantmentLevel: {type: Number, required: true, default: 0}
            },
            weaponCardsIds: [String]
        },
        required: false,
        default: null
    },
    knownBaseSpells: [String],
    knownSources: [IPreparedSource],
    temporarySources: [IPreparedSource],
    knownWeapons: [{
        baseId: {type: String, required: true},
        enchantmentLevel: {type: Number, required: true, default: 0},
        improvements: Number,
        efficientUse: Boolean
    }],
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
    },
    minionsOwned: {
        type: [{
            minionId: {type: String, required: true},
            isEquipped: {type: Boolean, required: true, default: false},
            equippedAs: {type: String, required: false}
        }],
        default: []
    },
    minionData: {
        type: [{
            minionName: {type: String, required: true},
            minionTemplateId: {type: String, required: true},
            minionXP: {type: Number, default: 0},
            attributeBars: {
                health: IAttributeBar,
                stamina: IAttributeBar,
                tether: IAttributeBar,
            },
            minionStatBonuses: {
                might: IModifiable,
                agility: IModifiable,
                skill: IModifiable,
                awareness: IModifiable,
                vitality: IModifiable,
                knowledge: IModifiable,
                mind: IModifiable,
                presence: IModifiable,
                command: IModifiable,
                endurance: IModifiable
            },
            bonuses: Object
        }],
        default: []
    },
    characterImageKey: String,
    campaignIds: {
        type: [String],
        required: true,
        default: []
    },
    isDead: {type: Boolean, required: false, default: false},
    creatorName: {type: String, required: true, default: "Unknown"},
    developmentIds: [String],
    settings: {
        dieColorId: {type: String, required: true, default: "DD_STANDARD"},
        showAttributeDescriptions: {type: Boolean, required: true, default: false}
    },
    __times_accessed: {default: 0, type: Number, required: true}
})

const CharacterModel = mongoose.model('characters', CharacterSchema);
export default CharacterModel;