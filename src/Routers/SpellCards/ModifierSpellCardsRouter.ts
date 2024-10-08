import {Router} from 'express'
import {AddEdictSpell, AddModifierSpell} from "../../Controllers/AddCardsController";
import {GetAllSpellModifiers} from "../../Controllers/GetCardDataController";
import {EditModifierSpell} from "../../Controllers/EditCardsController";

const router = Router();

router.get('/getAll', GetAllSpellModifiers)

router.post('/add', AddModifierSpell);
router.post("/edict/add", AddEdictSpell);

router.put('/update/:id', EditModifierSpell);

export default router;