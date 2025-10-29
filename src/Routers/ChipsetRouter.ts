import express from "express"
import DatachipRouter from "./DatachipRouter";
import PackageRouter from "./PackageRouter";

const router = express.Router()

router.use("/datachips", DatachipRouter)
router.use("/packages", PackageRouter)

export default router;
