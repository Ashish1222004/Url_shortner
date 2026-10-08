import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient from "../config/redis.config.js";

export const createUrlLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,

  limit: 100,

  keyGenerator: (req) => {
    return req.userId.toString();
  },

  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),

  message: {
    message: "Too many URLs created. Please try again later."
  },

  standardHeaders: true,
  legacyHeaders: false
});