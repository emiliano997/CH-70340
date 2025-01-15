import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/clase_9",
  PERSISTANCE: process.env.PERSISTANCE || "mongodb",
};
