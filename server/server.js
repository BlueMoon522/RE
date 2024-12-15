import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./connectDB/connectDB.js";
import { userCreate } from "./controllers/user.controller.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/user", userCreate);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server Running on :${PORT}`);
});
