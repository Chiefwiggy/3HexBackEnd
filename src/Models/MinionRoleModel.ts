import mongoose, {Document, Schema} from 'mongoose'

export interface _IMinionRoleSchema extends Document {
    roleId: string,
    roleName: string,
    roleDescription: string,
    commanderAuthorityModifiers: {
        finalPower: number,
        toHit: number,
        critDamage: number,
        spellSaveSet:number,
        allSavesModifier: number,
        maxStamina: number
    },
    minionMightModifiers: {
        finalPower: number,
    },
    minionTechniqueModifiers: {
        toHit: number,
        critDamage: number,
        maxTether: number,
        dodge: number
    },
    minionToughnessModifiers: {
        spellSaveSet: number,
        allSavesModifier: number,
        maxStamina: number,
        maxHealth: number,
        staminaRefreshMultiplier: number,
        tetherRefreshMultiplier: number,
        pDEF: number,
        mDEF: number
    },
    otherModifiers: {
        movement: number,
    }
}

const MinionRoleSchema = new mongoose.Schema<_IMinionRoleSchema>({
    roleId: {type: String, required: true, unique: true},
    roleName: {type: String, required: true, unique: true},
    roleDescription: {type: String, required: true},
    commanderAuthorityModifiers: {
        finalPower: {type: Number, required: true, default: 0.0},
        toHit: {type: Number, required: true, default: 0.0},
        critDamage: {type: Number, required: true, default: 0.0},
        spellSaveSet: {type: Number, required: true, default: 0.0},
        allSavesModifier: {type: Number, required: true, default: 0.0},
        maxStamina: {type: Number, required: true, default: 0.0}
    },
    minionMightModifiers: {
        finalPower: {type: Number, required: true, default: 0.0},
    },
    minionTechniqueModifiers:{
        toHit: {type: Number, required: true, default: 0.0},
        critDamage: {type: Number, required: true, default: 0.0},
        maxTether: {type: Number, required: true, default:  0.0},
        dodge: {type: Number, required: true, default: 0.0}
    },
    minionToughnessModifiers: {
        spellSaveSet: {type: Number, required: true, default: 0.0},
        allSavesModifier: {type: Number, required: true, default: 0.0},
        maxStamina: {type: Number, required: true, default: 0.0},
        maxHealth: {type: Number, required: true, default: 0.0},
        staminaRefreshMultiplier: {type: Number, required: true, default: 0.0},
        tetherRefreshMultiplier: {type: Number, required: true, default: 0.0},
        pDEF: {type: Number, required: true, default: 0.0},
        mDEF: {type: Number, required: true, default: 0.0},
    },
    otherModifiers: {
        movement: {type: Number, required: true, default: 0.0},
    }
})

const MinionRoleModel = mongoose.model("minion_roles", MinionRoleSchema);

export default MinionRoleModel;