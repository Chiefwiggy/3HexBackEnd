import express from 'express';
import {AddSource, GetAllSources} from "../Controllers/SourceController";


const router = express.Router();

router.post("/add", AddSource);
router.get("/getAll", GetAllSources);

export default router;