import express from 'express';
import {AddLaw} from "../Controllers/LawController";


const router = express.Router();

router.post("/add", AddLaw);

export default router;