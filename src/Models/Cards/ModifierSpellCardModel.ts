import AbstractSpellCardSchema from "./AbstractSpellCardSchema";
import mongoose from "mongoose";


const ModifierSpellCardModel = mongoose.model('spells_modifier', AbstractSpellCardSchema)

export default ModifierSpellCardModel;