import {Document} from 'mongoose'
import {_IScalingData} from "../Cards/BaseWeaponCardModel";

export interface _IMinionTemplateSchema extends Document {
    minionBaseName: string,
    leadershipRequirement: _IScalingData<number>,
    attributeBarsScaling: {
        health: number,
        stamina: number,
        tether: number
    },
    minionStats: {
        
    }
}