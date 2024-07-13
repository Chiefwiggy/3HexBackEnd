import mongoose from "mongoose";
import AbstractWeaponCardSchema from "./AbstractWeaponCardSchema";


const FormWeaponCardModel = mongoose.model('weapons_form', AbstractWeaponCardSchema)

export default FormWeaponCardModel;