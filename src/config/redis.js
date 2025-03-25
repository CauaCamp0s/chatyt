const Redis  = require("ioredis")

// Initialize Redis client
const redis = new Redis({
    host: "localhost",  // Ou "127.0.0.1"
    port: 6379,
    password: "Redis2019!",
});

// Test Redis connection
async function testRedisConnection() {
  try {
    await redis.set("test", "connected")
    const test = await redis.get("test")
    console.log("Redis connection:", test === "connected" ? "OK" : "Failed")
  } catch (error) {
    console.error("Redis connection error:", error)
  }
}

module.exports = {
  redis,
  testRedisConnection,
}

