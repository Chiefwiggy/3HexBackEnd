import mongoose from 'mongoose';
import AbstractSpellCardSchema, {_ISpellCardData} from "./AbstractSpellCardSchema";
import AbstractWeaponCardSchema, {_IWeaponCardData} from "./AbstractWeaponCardSchema";

export interface _IConditionCard extends _ISpellCardData, _IWeaponCardData, mongoose.Document {
    appliesTo: {
        attacks: boolean,
        spells: boolean,
        hacks: boolean
    }
}

const ConditionCardSchema = new mongoose.Schema<_IConditionCard>({
    appliesTo: {
        attacks: {required: true, default: true, type: Boolean},
        spells: {required: true, default: true, type: Boolean},
        hacks: {required: true, default: true, type: Boolean}
    }
})

ConditionCardSchema.add(AbstractSpellCardSchema);
ConditionCardSchema.add(AbstractWeaponCardSchema);

const ConditionCardModel = mongoose.model("condition_cards", ConditionCardSchema);

export default ConditionCardModel