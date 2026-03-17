import express from "express";

import {
  getLoggedInUser,
  logIn,
  logOut,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/authentication.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Public routes (no auth required)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.use(authenticationMiddleware);

router.post("/register", register);
router.post("/login", logIn);
router.get("/user", getLoggedInUser);
router.get("/logout", logOut);

export default router;
