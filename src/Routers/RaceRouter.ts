import express from 'express';
import {AddRace} from "../Controllers/RaceController";


const router = express.Router();

router.post("/add", AddRace);

export default router;