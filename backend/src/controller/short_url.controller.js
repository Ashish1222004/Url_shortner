import { getShortUrl, getUrlsByUser } from "../dao/short_url.dao.js"
import { createShortUrlWithUser } from "../services/short_url.service.js";


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
export const redirectFromShortUrl = async (req,res,next)=>{
    try {
        const {id} = req.params
        const url = await getShortUrl(id)
        res.redirect(url.full_url)
    } catch (error) {
        next(error)
    }
}

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