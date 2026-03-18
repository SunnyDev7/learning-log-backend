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
router.post("/register", register);
router.post("/login", logIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.use(authenticationMiddleware);

router.get("/user", getLoggedInUser);
router.get("/logout", logOut);

export default router;
