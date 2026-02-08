import express from "express";

import { createCategory } from "../controllers/category.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/create", authenticationMiddleware, createCategory);

export default router;
