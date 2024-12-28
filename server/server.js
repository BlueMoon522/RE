import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./connectDB/connectDB.js";
import userRoute from "./routes/users.routes.js";
import cookieParser from "cookie-parser";
import topicRoutes from "./routes/topic.routes.js";
import editorRoutes from "./routes/editorRoutes.js";
import cors from "cors";
import contentRoutes from "./routes/content.routes.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5174", //if u dont set origin it doesnot work??IDK why
    credentials: true, //to send and receive cookie
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/user/post", topicRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server Running on :${PORT}`);
});
