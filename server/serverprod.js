import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./connectDB/connectDB.js";
import userRoute from "./routes/users.routes.js";
import cookieParser from "cookie-parser";
import topicRoutes from "./routes/topic.routes.js";
import editorRoutes from "./routes/editorRoutes.js";
import cors from "cors";
import contentRoutes from "./routes/content.routes.js";

import path from "path";
import { fileURLToPath } from "url";

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5000", //if u dont set origin it doesnot work??IDK why
    credentials: true, //to send and receive cookie
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/user/post", topicRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/content", contentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server Running on :${PORT}`);
});
