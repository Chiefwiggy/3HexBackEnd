import {Router} from 'express'
import {AddTargetSpell} from "../../Controllers/AddCardsController";
import {GetAllSpellTargets} from "../../Controllers/GetCardDataController";
import {EditTargetSpell} from "../../Controllers/EditCardsController";

const router = Router();

router.get('/getAll', GetAllSpellTargets)

router.post('/add', AddTargetSpell);

router.put('/update/:id', EditTargetSpell);

export default router;