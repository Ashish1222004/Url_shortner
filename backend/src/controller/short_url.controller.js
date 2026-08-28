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
        const urls = await getUrlsByUser(req.userId);

        res.status(200).json({
            urls
        });
    } catch (error) {
        next(error);
    }
};