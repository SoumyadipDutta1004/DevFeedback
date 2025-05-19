import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  JWT_SECRET,
  MONGODB_URI,
} = process.env;
