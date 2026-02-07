import express from "express";
import cors from "cors";

import healthCheckRoutes from "./routes/healthCheck.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";

const app = express();

//Security Middleware
app.use(cors());

//Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));

// Health check
app.use("/api/health", healthCheckRoutes);
app.use("/api/auth", authenticationRoutes);

export default app;
