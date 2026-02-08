import express from "express";

import {
  getLoggedInUser,
  logIn,
  register,
} from "../controllers/authentication.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/user", authenticationMiddleware, getLoggedInUser);

export default router;
