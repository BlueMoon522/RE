import express from "express";
import { userCreate } from "../controllers/user.controller";

const router = express();

router.post("/", userCreate);

export default router;
