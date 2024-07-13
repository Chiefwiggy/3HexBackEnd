import {Router} from 'express'
import {AddBaseSpell} from "../../Controllers/AddCardsController";
import {GetAllSpellBases} from "../../Controllers/GetCardDataController";
import {EditBaseSpell} from "../../Controllers/EditCardsController";

const router = Router();

router.get('/getAll', GetAllSpellBases)

router.post('/add', AddBaseSpell);

router.put('/update/:id', EditBaseSpell);
export default router;