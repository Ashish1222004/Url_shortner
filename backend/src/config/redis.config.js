import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
  console.error("Redis Error:", error);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

export default redisClient;