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
router.get("/", getAllContent);
router.get("/:id", getContent);
router.delete("/:id", protectedRoutes, deleteContent);

export default router;
