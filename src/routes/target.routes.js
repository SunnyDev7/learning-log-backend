import express from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { getTargets } from "../controllers/target.controller.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", getTargets);

export default router;
