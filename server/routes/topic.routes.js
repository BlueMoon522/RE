import express from "express";
import { topicCreate } from "../controllers/topic.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/", protectedRoutes, topicCreate);

export default router;
