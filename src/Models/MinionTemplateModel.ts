import mongoose, {Document} from 'mongoose';
import {_ICalculatedSpell, _ICalculatedWeapon, _IKnownArmorStruct, _IModifiable} from "./CharacterModel";
import {EMinionRole} from "../Enums/CharacterEnums";

export interface _IMinionTemplateSchema extends Document {
    minionTemplateName: string,
    minionRole: string,
    minionBaseStats: {
        might: number,
        agility: number,
        skill: number,
        awareness: number,
        vitality: number,
        knowledge: number,
        mind: number,
        presence: number,
        command: number,
        endurance: number
    },
    baseMovement: {
        stepSpeedBonus: number,
        dashSpeedBonus: number,
        canClimb?: boolean,
        canFly?: boolean,
        canSwim?: boolean
    },
    currentSpell: _ICalculatedSpell|null,
    currentWeapon: _ICalculatedWeapon|null,
    currentArmor: _IKnownArmorStruct|null,
    baseBonuses: Object
}

const MinionTemplateSchema = new mongoose.Schema<_IMinionTemplateSchema>({
    minionTemplateName: {type: String, required: true, unique: true},
    minionRole: {type: String, required: true, enum: EMinionRole, default: "soldier"},
    minionBaseStats: {
        might: {type: Number, default: 0, required: true},
        agility: {type: Number, default: 0, required: true},
        skill: {type: Number, default: 0, required: true},
        awareness: {type: Number, default: 0, required: true},
        vitality: {type: Number, default: 0, required: true},
        knowledge: {type: Number, default: 0, required: true},
        mind: {type: Number, default: 0, required: true},
        presence: {type: Number, default: 0, required: true},
        command: {type: Number, default: 0, required: true},
        endurance: {type: Number, default: 0, required: true}
    },
    baseMovement: {
        stepSpeedBonus: {type: Number, default: 0, required: true},
        dashSpeedBonus: {type: Number, default: 0, required: true},
        canClimb: Boolean,
        canFly: Boolean,
        canSwim: Boolean
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
    currentArmor: {
        type: {
            baseId: {type: String, required: true},
            enchantmentLevel: {type: Number, required: true, default: 0}
        },
        required: false,
        default: null
    },
    baseBonuses: Object
})

const MinionTemplateModel = mongoose.model("minion_templates", MinionTemplateSchema);

export default MinionTemplateModel;