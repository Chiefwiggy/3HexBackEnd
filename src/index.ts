import express from 'express'
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

const PORT: number = Number(process.env.PORT) || 3001;

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/characters", CharacterRouter);
app.use('/cards', CardRouter);
app.use('/auth', AuthRouter);
app.use("/equipment", EquipmentRouter);
app.use("/abilities", AbilityRouter);
app.use("/users", UserRouter);
app.use("/classes", ClassRouter);

mongoose.connect(process.env.MONGO_URL ?? "").catch((err) => {
    console.error("Error: could not connect to mongodb")
})

const server = app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})