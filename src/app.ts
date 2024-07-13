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

const PORT: number = Number(process.env.PORT) || 3001;

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = Router();

router.use("/characters", CharacterRouter);
router.use('/cards', CardRouter);
router.use('/auth', AuthRouter);
router.use("/equipment", EquipmentRouter);
router.use("/abilities", AbilityRouter);
router.use("/users", UserRouter);
router.use("/classes", ClassRouter);

app.use('/api/', router);



export {app, router}