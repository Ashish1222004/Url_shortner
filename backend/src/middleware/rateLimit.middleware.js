import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient, { connectRedis } from "../config/redis.config.js";

let limiter = null;

export const createUrlLimiter = async (req, res, next) => {
  try {
    if (!redisClient.isOpen) {
      await connectRedis();
    }

    if (!limiter) {
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
          message:
            "Too many URLs created. Please try again later."
        },

        standardHeaders: true,
        legacyHeaders: false
      });
    }

    return limiter(req, res, next);
  } catch (error) {
    next(error);
  }
};