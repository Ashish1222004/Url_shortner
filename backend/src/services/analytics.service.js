import { UAParser } from "ua-parser-js";
import { analyticsQueue } from "../queue/analytics.queue.js";

export const trackAnalytics = async (shortUrl, req) => {
  const userAgent = req.headers["user-agent"] || "";

  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const browser = result.browser.name || "Unknown";

  const device =
    result.device.type ||
    (result.os.name ? "Desktop" : "Unknown");

  const referrer = req.get("referer") || "Direct";

  await analyticsQueue.add(
    "track-click",
    {
      shortUrl,
      browser,
      device,
      referrer
    }
  );
};