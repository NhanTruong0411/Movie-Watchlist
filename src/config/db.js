import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "../prisma/contract.json" with { type: "json" };

const prisma = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await prisma.connect();
    console.log("🚀 Connected to database via Prisma");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.close();
    console.log("🔌 Disconnected from database via Prisma");
  } catch (error) {
    console.error("Error disconnecting from database", error);
  }
};

export { prisma, connectDB, disconnectDB };
