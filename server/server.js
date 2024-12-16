import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./connectDB/connectDB.js";
import { userCreate } from "./controllers/user.controller.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", //if u dont set origin it doesnot work??IDK why
    credentials: true, //to send and receive cookie
  }),
);

app.use(express.json());

app.use("/api/user", userCreate);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server Running on :${PORT}`);
});
