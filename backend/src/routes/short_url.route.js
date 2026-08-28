import express from 'express';
import {
    createShortUrl,
    getMyUrls
} from '../controller/short_url.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", authenticateUser, createShortUrl);

router.get("/my-urls", authenticateUser, getMyUrls);

export default router;