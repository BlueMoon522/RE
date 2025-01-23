import express from "express";
import {
  deleteTopic,
  topicCreate,
  updateTopic,
  userTopics,
  userPublicTopics,
  bookmarkTopics,
} from "../controllers/topic.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/bookmark/:id", protectedRoutes, bookmarkTopics);
router.post("/", protectedRoutes, topicCreate);
router.post("/:id", protectedRoutes, updateTopic);
router.get("/", protectedRoutes, userTopics);
router.get("/public", protectedRoutes, userPublicTopics);
router.delete("/:id", protectedRoutes, deleteTopic);

export default router;
