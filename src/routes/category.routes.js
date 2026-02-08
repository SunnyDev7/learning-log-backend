import express from "express";

import {
  createCategory,
  getCategories,
  updateCategories,
} from "../controllers/category.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/create", authenticationMiddleware, createCategory);
router.get("/", authenticationMiddleware, getCategories);
router.put("/:id", authenticationMiddleware, updateCategories);

export default router;
