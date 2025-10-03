import mongoose from 'mongoose';
import AbstractTechnikCardSchema from "./AbstractTechnikCardSchema";

const ModifierTechnikCardModel = mongoose.model("hack_modifiers", AbstractTechnikCardSchema);

export default ModifierTechnikCardModel;