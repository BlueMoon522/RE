import express from "express";
import {
  getAllContent,
  getContent,
  postContent,
} from "../controllers/content.controller.js";

const router = express();

router.post("/:id", postContent);
router.get("/", getAllContent);
router.get("/:id", getContent);

export default router;
