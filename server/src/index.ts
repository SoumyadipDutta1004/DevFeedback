import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env";
import connectDB from "./database/mongoDB";

import authRoute from "./routes/auth.route";
import authMiddleware from "./middlewares/auth.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);

app.get("/", authMiddleware, (req, res) => {
  res.send("Hello World!");
});

(async function () {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
})();
