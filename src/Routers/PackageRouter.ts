import express from "express"
import {AddPackage, GetAllPackages} from "../Controllers/PackageController";

const router = express.Router()

router.post("/add", AddPackage)
router.get("/getAll", GetAllPackages)

export default router;