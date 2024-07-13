import {app, router} from './app'
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL ?? "").catch((err) => {
    console.error("Error: could not connect to mongodb")
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[server]: Server is running`);
});