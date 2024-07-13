import express, {Request, Response} from 'express';
import {AddPreparedSpell, AddPreparedWeapon, GetAllWeaponsPrepared} from "../../Controllers/PrepController";

const router = express.Router();

router.post("/:characterId/weapon/add", AddPreparedWeapon)
router.delete("/:characterId/weapon/remove", () => {})
router.post("/:characterId/spell/add", AddPreparedSpell)
router.delete("/:characterId/spell/remove", () => {})

router.get("/:characterId/weapon/getAll", GetAllWeaponsPrepared);
router.get("/:characterId/spell/getAll", () => {});
router.get("/:characterId/getCurrent", (req: Request, res: Response) => {
    res.status(200).json(req.params)
})

export default router;