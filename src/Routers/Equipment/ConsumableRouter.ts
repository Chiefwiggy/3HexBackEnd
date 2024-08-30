import {Router} from 'express'
import {AddConsumable} from "../../Controllers/Equipment/ArmorController";

const router = Router();

router.post("/add", AddConsumable);

export default router;