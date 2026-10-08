import {
  getShortUrl,
  getUrlsByUser,
  incrementClick
} from "../dao/short_url.dao.js";

import { createShortUrlWithUser } from "../services/short_url.service.js";
import redisClient from "../config/redis.config.js";
import { trackAnalytics } from "../services/analytics.service.js";


export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    const shortUrl = await createShortUrlWithUser(
      url,
      req.userId
    );

    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    next(error);
  }
};


export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    let fullUrl = await redisClient.get(id);

    if (!fullUrl) {
      const url = await getShortUrl(id);

      if (!url) {
        return res.status(404).json({
          message: "Short URL not found"
        });
      }

      fullUrl = url.full_url;

      await redisClient.setEx(
        id,
        3600,
        fullUrl
      );
    } else {
      await incrementClick(id);
    }
    await trackAnalytics(id, req);
    res.redirect(fullUrl);
  } catch (error) {
    next(error);
  }
};


export const getMyUrls = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { urls, totalUrls } = await getUrlsByUser(
      req.userId,
      page,
      limit
    );

    const totalPages = Math.ceil(totalUrls / limit);

    res.status(200).json({
      page,
      limit,
      totalUrls,
      totalPages,
      urls
    });
  } catch (error) {
    next(error);
  }
};