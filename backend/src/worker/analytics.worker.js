import { Worker } from "bullmq";
import IORedis from "ioredis";
import { saveAnalytics } from "../dao/analytics.dao.js";

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

export const analyticsWorker = new Worker(
  "analytics",

  async (job) => {
    const {
      shortUrl,
      browser,
      device,
      referrer
    } = job.data;

    await saveAnalytics(
      shortUrl,
      browser,
      device,
      referrer
    );
  },

  {
    connection
  }
);