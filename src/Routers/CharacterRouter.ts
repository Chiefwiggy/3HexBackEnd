import express from 'express'
import {
    AddCharacter,
    GetAllCharacters, GetCharacterById,
    GetCharactersFromUser,
    UpdateCharacter,
    DeleteCharacter
} from "../Controllers/CharacterController";
import PreparationRouter from "./Prep/PreparationRouter";

const router = express.Router();

router.get("/getAll", GetAllCharacters);
router.get("/get/:id", GetCharacterById);
router.get("/getMine", GetCharactersFromUser);

router.put("/update/:characterId", UpdateCharacter);

router.delete("/delete/:characterId", DeleteCharacter);

router.use("/prep", PreparationRouter);


router.post("/add", AddCharacter);


export default router;
