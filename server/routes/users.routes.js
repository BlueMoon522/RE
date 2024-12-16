import express from "express";
import { getInfo, userCreate } from "../controllers/user.controller";
import { protectedRoutes } from "../middleware/protectedRoutes";

const router = express();

router.post("/", userCreate);
router.get("/info", protectedRoutes, getInfo);

export default router;
