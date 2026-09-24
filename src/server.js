import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();

const app = express();
const PORT = 5001;
const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Browser on another origin must be listed here before it can send cookies.
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

let server;

const start = async () => {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`🚀🚀 Server is running on port ${PORT}`);
  });
};

// Handle unhandled promise rejections (e.g. database connection errors)
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions (e.g. unhandled errors)
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Graceful shutdown
const shutdown = async () => {
  console.log("🔌 Shutting down server...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
