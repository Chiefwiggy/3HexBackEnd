import mongoose, {Schema} from 'mongoose'
import {_IAttributeBar, _IModifiable, IAttributeBar, IModifiable} from "./CharacterModel";

export interface _ICalculatedSpell {
    customName?: string,
    spellBaseId: string,
    spellTargetId: string,
    spellSkillsIds: Array<string>
}

export interface _ICalculatedWeapon {
    customName?: string,
    weaponBaseData: {
        baseId: string,
        enchantmentLevel: number
    },
    weaponCardsIds: Array<string>
}

export interface _IMinionSchema extends Document {
    minionName: string,
    leadershipRequirement: number,
    attributeBars: {
        health: _IAttributeBar,
        stamina: _IAttributeBar
        tether: _IAttributeBar
    },
    minionStats: {
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
    movement: {
        stepSpeed: _IModifiable,
        dashSpeed: _IModifiable,
        canClimb?: boolean,
        canFly?: boolean,
        canSwim?: boolean
    },
    currentSpell: _ICalculatedSpell|null,
    currentWeapon: _ICalculatedWeapon|null,
    isAdjutant: boolean,
    currentArmorId: string,
    bonuses: {
        staminaRefresh: number,
        tetherRefresh: number,
        maxHealth: number,
        maxStamina: number,
        maxTether: number,
        hitBonus: number,
        critBonus: number
    },
}
const MinionSchema = new mongoose.Schema<_IMinionSchema>({
    minionName: {type: String, required: true},
    leadershipRequirement: {type: Number, required: true, default: 0},
    attributeBars: {
        health: IAttributeBar,
        stamina: IAttributeBar,
        tether: IAttributeBar
    },
    minionStats: {
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
        hitBonus: { type: Number, required: false, default: 0},
        critBonus: { type: Number, required: false, default: 0},
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
                enchantmentLevel: {type: Number, required: true, default: 0}
            },
            weaponCardsIds: [String]
        },
        required: false,
        default: null
    },
    isAdjutant: {type: Boolean, required: true, default: false},
    currentArmorId: {type: String, default: undefined},
});

const MinionModel = mongoose.model('minions', MinionSchema);

export default MinionModel;