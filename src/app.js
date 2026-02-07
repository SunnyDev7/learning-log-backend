import express from "express";
import cors from "cors";

const app = express();

//Security Middleware
app.use(cors());

//Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server Up", timestamp: new Date().toISOString() });
});

export default app;
