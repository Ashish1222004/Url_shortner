import express from 'express';
import {
    createShortUrl,
    getMyUrls
} from '../controller/short_url.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { createUrlLimiter } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  createUrlLimiter,
  createShortUrl
);

router.get("/my-urls", authenticateUser, getMyUrls);

export default router;