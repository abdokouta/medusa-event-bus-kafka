"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
const uuid_1 = require("uuid");
const config_1 = require("../config");
/**
 * Initializes the Redis service. 🚀
 */
class RedisService {
    /**
     * Initializes the Redis service. 🚀
     * @param loggerService - The loggerService instance.
     */
    constructor(loggerService) {
        this.logger = loggerService;
        this.redisClient = new ioredis_1.Redis((0, config_1.redisClientOptions)());
    }
    /**
     * 🌐 Connects to the Redis broker.
     */
    async connect() {
        try {
            await this.redisClient.connect();
            this.logger.info("✅ Redis client connected.");
        }
        catch (error) {
            this.logger.error("❌ Failed to connect to Redis:", error);
        }
    }
    /**
     * Disconnects from the Redis broker. 🚫
     */
    async disconnect() {
        try {
            await this.redisClient.disconnect();
            this.logger.info("✅ Redis client disconnected.");
        }
        catch (error) {
            this.logger.error("❌ Failed to disconnect from Redis:", error);
        }
    }
    /**
     * 📤 Emits a Redis message to the specified topic.
     * @param topic - The Redis topic to send the message to.
     * @param message - The message payload to send.
     * @param additionalHeaders - Additional headers to include in the message.
     * @returns {Promise<{ status: string, message: string }>} An object with status and message.
     */
    async emitMessage(topic, message) {
        const timestamp = Date.now().toString();
        // Headers to include in the message 🪖
        const headers = {
            "X-Event-Name": topic,
            "X-Event-Token": (0, uuid_1.v4)(),
            "Content-Type": "application/json",
            "X-Timestamp": timestamp.toString(),
            "X-Event-Source": process.env.APP_NAME,
        };
        const payload = {
            headers: headers,
            timestamp: timestamp.toString(),
            data: message,
        };
        try {
            await this.redisClient.publish(topic, JSON.stringify(payload));
            this.logger.info(`✅ Redis event sent successfully: ${topic}`);
            // Return success status and message
            return {
                status: "success",
                message: `Redis event sent successfully: ${topic}`,
            };
        }
        catch (error) {
            this.logger.error("❌ Failed to send Redis event:", error);
            // Disconnect from Redis when an error occurs 🚫
            await this.disconnect();
            // Return error status and message
            return { status: "error", message: "Failed to send Redis event." };
        }
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map