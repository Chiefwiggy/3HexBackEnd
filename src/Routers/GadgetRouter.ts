import {Router} from 'express'
import {AddGadget, GetAllGadgets, GetGadgetsPossibleForCharacter, UpdateGadget} from "../Controllers/GadgetController";

const router = Router();

router.get("/getAll", GetAllGadgets)
router.get("/getPossible/:characterId", GetGadgetsPossibleForCharacter)
router.post("/add", AddGadget)
router.put("/update/:id", UpdateGadget)

export default router;