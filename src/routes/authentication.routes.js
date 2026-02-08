import express from "express";

import { logIn, register } from "../controllers/authentication.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);

export default router;
