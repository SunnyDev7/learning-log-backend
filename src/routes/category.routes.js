import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  reorderCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/create", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.post("/reorder", reorderCategories);

export default router;
