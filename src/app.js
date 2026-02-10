import express from "express";
import cors from "cors";

import healthCheckRoutes from "./routes/healthCheck.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

//Security Middleware
app.use(cors());

//Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));

// Health check
app.use("/api/health", healthCheckRoutes);

//Auth
app.use("/api/auth", authenticationRoutes);

//Category
app.use("/api/categories", categoryRoutes);

//Activity
app.use("/api/activities", activityRoutes);

//Stats
app.use("/api/stats", statsRoutes);

export default app;
