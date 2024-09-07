import express from 'express';
import {AddFateline} from "../Controllers/FatelineController";


const router = express.Router();

router.post("/add", AddFateline);

export default router;