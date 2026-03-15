import express from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import {
  getDailyStats,
  getDashboardStats,
  getWeeklyStats,
  getYearlyStats,
} from "../controllers/stats.controller.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/dashboard", getDashboardStats);
router.get("/weekly", getWeeklyStats);
router.get("/yearly", getYearlyStats);
router.get("/daily/:date", getDailyStats);

export default router;
