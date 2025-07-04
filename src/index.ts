import express, {Router} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import CharacterRouter from "./Routers/CharacterRouter";
import CardRouter from "./Routers/CardRouter";
import AuthRouter from "./Routers/AuthRouter";
import EquipmentRouter from "./Routers/Equipment/EquipmentRouter";
import AbilityRouter from "./Routers/AbilityRouter";
import UserRouter from "./Routers/UserRouter";
import ClassRouter from "./Routers/ClassRouter";

import serverless from 'serverless-http';
import MinionRouter from "./Routers/MinionRouter";
import PreloadedRouter from "./Routers/PreloadedRouter";
import LawRouter from "./Routers/LawRouter";
import SourceRouter from "./Routers/SourceRouter";
import FatelineRouter from "./Routers/FatelineRouter";
import DowntimeRouter from "./Routers/DowntimeRouter";
import ConditionRouter from "./Routers/ConditionRouter";
import RaceRouter from "./Routers/RaceRouter";
import CachingRouter from "./Routers/CachingRouter";

const PORT: number = Number(process.env.PORT) || 3001;

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URL ?? "").catch((err) => {
    console.error("Error: could not connect to mongodb")
})

const router = Router();

router.use("/characters", CharacterRouter);
router.use('/cards', CardRouter);
router.use('/auth', AuthRouter);
router.use("/equipment", EquipmentRouter);
router.use("/abilities", AbilityRouter);
router.use("/users", UserRouter);
router.use("/classes", ClassRouter);
router.use("/minions", MinionRouter);
router.use("/preload", PreloadedRouter)
router.use("/laws", LawRouter);
router.use("/sources", SourceRouter);
router.use("/fatelines", FatelineRouter);
router.use("/races", RaceRouter);
router.use("/downtime", DowntimeRouter)
router.use("/conditions", ConditionRouter);
router.use("/cache", CachingRouter)


app.use('/.netlify/functions/index', router);

export default app;
export const handler = serverless(app);