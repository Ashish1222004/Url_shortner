import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient from "../config/redis.config.js";

let limiter;

export const initializeRateLimiter = () => {
  limiter = rateLimit({
    windowMs: 60 * 60 * 1000,

    limit: 100,

    keyGenerator: (req) => {
      return req.userId.toString();
    },

    store: new RedisStore({
      sendCommand: (...args) =>
        redisClient.sendCommand(args),
    }),

    message: {
      message: "Too many URLs created. Please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
  });
};

export const createUrlLimiter = (req, res, next) => {
  if (!limiter) {
    return next(
      new Error("Rate limiter is not initialized")
    );
  }

  return limiter(req, res, next);
};