import express from "express";
import { getContent, postContent } from "../controllers/content.controller.js";

const router = express();

router.post("/:id", postContent);
router.get("/", getContent);

export default router;
