import express from "express";
import {
  getInfo,
  loginUser,
  userCreate,
} from "../controllers/user.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/signup", userCreate);
router.post("/login", loginUser);
router.get("/info", protectedRoutes, getInfo);

export default router;
