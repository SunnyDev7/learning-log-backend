import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

const app = express();

//Security Middleware
app.use(cors());

//Body Parsing Middleware
app.use(express.json({ limit: "16kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server Up", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 8000;

connectDB().then(() => console.log("Connected to MongoDB"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
