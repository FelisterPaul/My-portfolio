import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myportfolio";
const PORT = process.env.PORT || 5000;

// health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// mount routes
app.use("/api/projects", projectsRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
