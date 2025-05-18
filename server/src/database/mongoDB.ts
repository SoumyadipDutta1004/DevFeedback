import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env";

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined inside .env');
}

let isConnected = false;

export default async function connectDB() {
  // Check if the database is already connected
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  
  try {
    await mongoose.connect(MONGODB_URI as string);
    isConnected = true;
    console.log("Connected to MongoDB");

  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit the process if database connection fails
  }
}