import express from "express";
import cors from "cors";

import healthCheckRoutes from "./routes/healthCheck.routes.js";

const app = express();

//Security Middleware
app.use(cors());

//Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));

// Health check
app.use("/api/health", healthCheckRoutes);

export default app;
