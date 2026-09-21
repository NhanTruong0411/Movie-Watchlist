import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "../prisma/contract.json" with { type: "json" };

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await db.connect();
    console.log("🚀 Connected to database via Prisma");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await db.close();
    console.log("🔌 Disconnected from database via Prisma");
  } catch (error) {
    console.error("Error disconnecting from database", error);
  }
};

export { db, db as prisma, connectDB, disconnectDB };
