import urlSchema from "../models/short_url.model.js";


export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl
        })
        if(userId){
    newUrl.user = userId
}
        await newUrl.save()
    } catch (error) {
        throw error
    }
};


export const getShortUrl=async(shortUrl)=>{
    try {
        return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
    } catch (error) {
        throw error
    }
}

export const getUrlsByUser = async (userId) => {
    try {
        return await urlSchema.find({ user: userId });
    } catch (error) {
        throw error;
    }
};