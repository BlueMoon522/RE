import express from "express";
import {
  deleteContent,
  getAllContent,
  getContent,
  postContent,
  updateContent,
} from "../controllers/content.controller.js";

const router = express();

router.post("/:id", postContent);
router.post("/update/:id", updateContent);
router.get("/", getAllContent);
router.get("/:id", getContent);
router.delete("/:id", deleteContent);

export default router;
