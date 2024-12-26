import express from "express";
import {
  deleteContent,
  getAllContent,
  getContent,
  postContent,
  updateContent,
} from "../controllers/content.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express();

router.post("/:id", protectedRoutes, postContent);
router.post("/update/:id", protectedRoutes, updateContent);
router.get("/", protectedRoutes, getAllContent);
router.get("/:id", protectedRoutes, getContent);
router.delete("/:id", protectedRoutes, deleteContent);

export default router;
