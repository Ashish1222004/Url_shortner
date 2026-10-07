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

export const getUrlsByUser = async (userId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const urls = await urlSchema
      .find({ user: userId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalUrls = await urlSchema.countDocuments({
      user: userId
    });

    return {
      urls,
      totalUrls
    };
  } catch (error) {
    throw error;
  }
};