import express from "express";

import {
  getLoggedInUser,
  logIn,
  logOut,
  register,
} from "../controllers/authentication.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/register", register);
router.post("/login", logIn);
router.get("/user", getLoggedInUser);
router.get("/logout", logOut);

export default router;
