import express from "express";

import {
  createActivity,
  getActivities,
} from "../controllers/activity.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/create", createActivity);
router.get("/", getActivities);

export default router;
