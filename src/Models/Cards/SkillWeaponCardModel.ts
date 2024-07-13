import mongoose from "mongoose";
import AbstractWeaponCardSchema from "./AbstractWeaponCardSchema";


const SkillWeaponCardModel = mongoose.model('weapons_skill', AbstractWeaponCardSchema);

export default SkillWeaponCardModel;