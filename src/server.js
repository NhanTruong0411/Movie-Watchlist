import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

config();

const app = express();
const PORT = 5001;

app.use("/movies", movieRoutes);

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
