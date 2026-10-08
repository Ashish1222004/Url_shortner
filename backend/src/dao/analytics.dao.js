import Analytics from "../models/analytics.model.js";

export const saveAnalytics = async (
  shortUrl,
  browser,
  device,
  referrer
) => {
  const analytics = new Analytics({
    short_url: shortUrl,
    browser,
    device,
    referrer
  });

  await analytics.save();
};