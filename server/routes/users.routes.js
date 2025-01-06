import express from "express";
import {
  authedUser,
  getInfo,
  loginUser,
  logout,
  userCreate,
} from "../controllers/user.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/signup", userCreate);
router.post("/login", loginUser);
router.post("/logout", protectedRoutes, logout);
router.get("/info", protectedRoutes, getInfo);
router.get("/auth", protectedRoutes, authedUser);

export default router;
