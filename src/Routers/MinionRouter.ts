import {Router} from 'express'
import {
    CreateMinion,
    CreateMinionRole,
    GetAllMinions,
    GetMinionsByIds,
    UpdateMinion
} from "../Controllers/MinionController";

const router = Router();

router.get('/getAll', GetAllMinions);
router.get('/get', GetMinionsByIds)

router.post("/create", CreateMinion)
router.post("/role/create", CreateMinionRole)

router.put("/update", UpdateMinion);

export default router;