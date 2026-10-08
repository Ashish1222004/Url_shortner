export const createShortUrlWithUser = async (url, userId) => {
    const maxRetries = 5;

    for (let i = 0; i < maxRetries; i++) {
        const shortUrl = generateNanoId(7);

        try {
            await saveShortUrl(shortUrl, url, userId);
            return shortUrl;
        } catch (error) {
            if (error.code === 11000) {
                continue;
            }

            throw error;
        }
    }

    throw new Error("Failed to generate unique short URL");
};