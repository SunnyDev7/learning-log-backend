import express from "express";

import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/create", authenticationMiddleware, createCategory);
router.get("/:id", authenticationMiddleware, getCategories);

export default router;
