import express from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { getTargets, updateTargets } from "../controllers/target.controller.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", getTargets);
router.put("/update", updateTargets);

export default router;
