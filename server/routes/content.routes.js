import express from "express";
import { postContent } from "../controllers/content.controller.js";

const router = express();

router.get("/:id", postContent);

export default router;
