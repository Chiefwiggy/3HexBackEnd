import express from 'express';
import {AddDatachip, GetAllDatachips} from "../Controllers/DatachipController";

const router = express.Router();

router.post("/add", AddDatachip)
router.get("/getAll", GetAllDatachips);

export default router;