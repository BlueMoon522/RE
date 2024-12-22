import express from "express";
import { topicCreate, userTopics } from "../controllers/topic.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/", protectedRoutes, topicCreate);
router.get("/", protectedRoutes, userTopics);

export default router;
