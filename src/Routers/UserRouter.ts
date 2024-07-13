import {Router} from 'express'
import {AddCharacter} from "../Controllers/CharacterController";
import {AddCharacterToUser} from "../Controllers/AuthController";

const router = Router();

router.post("/characters/add/:characterId/owner", AddCharacterToUser("edit"));

export default router;