import AbstractCardSchema, {_IAbstractCardData, _IDataModifiers} from "../Generics/AbstractCardSchema";
import mongoose, {Schema} from "mongoose";
import {_IAttributes} from "../CharacterModel";

const IDataModifiers = {
    modifier: {type: Number, required: false},
    multiplier: {type: Number, required: false},
    override: {type: Number, required: false}
}

const ISpecialistData = {
    hit: IDataModifiers,
    power: IDataModifiers,
}

interface _ISpecialistData {
    hit?: _IDataModifiers;
    power?: _IDataModifiers;
}

export interface _ICommanderCardData extends _IAbstractCardData {
    appliesTo: {
        commander: boolean,
        adjutant?: boolean,
        minions: boolean
    }
    characterModifiers: {
        stats: {
            might: _IDataModifiers,
            agility: _IDataModifiers,
            skill: _IDataModifiers,
            awareness: _IDataModifiers,
            vitality: _IDataModifiers,
            knowledge: _IDataModifiers,
            mind: _IDataModifiers,
            presence: _IDataModifiers,
            authority: _IDataModifiers,
            endurance: _IDataModifiers,
        },
        movement: {
            stepSpeed: _IDataModifiers,
            dashSpeed: _IDataModifiers,
        },
        bonuses: Object,
        specialization: {
            axes?: _ISpecialistData,
            blades?: _ISpecialistData,
            bows?: _ISpecialistData,
            clubs?: _ISpecialistData,
            polearms?: _ISpecialistData,
            wands?: _ISpecialistData,
            spears?: _ISpecialistData,
            unarmed?: _ISpecialistData
        },
        quickSlots: _IDataModifiers,
    },
    unlocks: {
        minionsUseEdicts?: boolean,
        weaponSpecialistPower?: boolean,
        weaponSpecialistAccuracy?: boolean,
        weaponSpecialistGeneralist?: boolean
    },
    minionSlots: number,
    adjutantSlots: number
}

const CommanderCardSchema = new Schema<_ICommanderCardData>({
    appliesTo: {
        type: {
            commander: {type: Boolean, required: true, default: true},
            adjutant: {type: Boolean, required: false},
            minions: {type: Boolean, required: true, default: true}
        },
        required: true
    },
    characterModifiers: {
        stats: {
            might: IDataModifiers,
            agility: IDataModifiers,
            skill: IDataModifiers,
            awareness: IDataModifiers,
            vitality: IDataModifiers,
            knowledge: IDataModifiers,
            mind: IDataModifiers,
            presence: IDataModifiers,
            authority: IDataModifiers,
            endurance: IDataModifiers
        },
        movement: {
            stepSpeed: IDataModifiers,
            dashSpeed: IDataModifiers
        },
        bonuses: Object,
        specialization: {
            axes: ISpecialistData,
            blades: ISpecialistData,
            bows: ISpecialistData,
            clubs: ISpecialistData,
            polearms: ISpecialistData,
            wands: ISpecialistData,
            spears: ISpecialistData,
            unarmed: ISpecialistData
        },
        quickSlots: IDataModifiers,
    },
    unlocks: {
        minionsUseEdicts: Boolean,
        weaponSpecialistAccuracy: Boolean,
        weaponSpecialistPower: Boolean,
        weaponSpecialistGeneralist: Boolean
    },
    minionSlots: Number,
    adjutantSlots: Number
})
CommanderCardSchema.add(AbstractCardSchema)

const CommanderCardModel = mongoose.model('commander_cards', CommanderCardSchema);

export default CommanderCardModel