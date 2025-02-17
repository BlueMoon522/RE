import express from "express";
import {
  deleteContent,
  getAllContent,
  getContent,
  getCurrentContent,
  postContent,
  updateContent,
} from "../controllers/content.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express();

router.post("/:id", protectedRoutes, postContent);
router.post("/:id", protectedRoutes, postContent); //add the subcontent,here the id of the content not the subcontent
router.post("/update/:id", protectedRoutes, updateContent);
router.get("/", getAllContent); //gets all the contents on the content DB
router.get("/get/:id", getCurrentContent); //get the content based on the contentID
router.get("/:id", getContent); //getAll the contents based on topicID
router.delete("/:id", protectedRoutes, deleteContent);

export default router;
