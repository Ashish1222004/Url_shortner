import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/mongo.config.js";
import { connectRedis } from "./src/config/redis.config.js";
import { initializeRateLimiter } from "./src/middleware/rateLimit.middleware.js";

import router from "./src/routes/short_url.route.js";
import authRoute from "./src/routes/auth.route.js";

import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

import "./src/workers/analytics.worker.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", router);
app.use("/api/auth", authRoute);

app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  await connectRedis();

  initializeRateLimiter();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();