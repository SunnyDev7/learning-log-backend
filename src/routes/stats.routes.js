import express from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { getDashboardStats } from "../controllers/stats.controller.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/dashboard", getDashboardStats);

export default router;
