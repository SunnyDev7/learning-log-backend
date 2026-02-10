import express from "express";

import {
  createActivity,
  getActivities,
  getCategoriesByDate,
  updateActivity,
} from "../controllers/activity.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.post("/create", createActivity);
router.get("/", getActivities);
router.post("/date/:date", getCategoriesByDate);
router.put("/:id", updateActivity);

export default router;
