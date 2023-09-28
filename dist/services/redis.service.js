"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const config_1 = require("../config");
/**
 * Initializes the Redis service. 🚀
 */
class RedisService {
    /**
     * Initializes the Redis service. 🚀
     * @param logger - The logger instance.
     */
    constructor(logger) {
        this.logger = logger;
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
    /**
     * Sets a key-value pair in Redis.
     *
     * @param key - The key to set.
     * @param value - The value to set for the key.
     * @param expiresIn - Optional expiration time in seconds.
     * @returns A Promise resolving to "OK" on successful set.
     */
    async set(key, value, expiresIn) {
        const result = await this.redisClient.set(key, value);
        // Set cache expiry if expiresIn is provided
        if (expiresIn) {
            await this.redisClient.expire(key, expiresIn);
        }
        return result;
    }
    /**
     * Gets the value associated with a key from Redis.
     *
     * @param key - The key to retrieve the value for.
     * @returns A Promise resolving to the value for the given key, or null if the key is not found.
     */
    async get(key) {
        const result = await this.redisClient.get(key);
        return result;
    }
    /**
     * Deletes a key from Redis.
     *
     * @param key - The key to delete.
     * @returns A Promise resolving to the number of keys deleted.
     */
    async del(key) {
        const result = await this.redisClient.del(key);
        return result;
    }
    /**
     * Subscribes to a Redis topic and returns an Observable to receive messages.
     *
     * @param topic - The topic to subscribe to.
     * @returns An Observable emitting messages received on the topic.
     */
    subscribe(topic) {
        return new rxjs_1.Observable((subscriber) => {
            this.redisClient.subscribe(topic, async (err, count) => {
                if (err) {
                    subscriber.error(err);
                }
                else {
                    this.logger.info(`Subscribed to ${count} topic(s)`);
                }
            });
            const messageSubscriber = (topic, message) => {
                if (topic === topic) {
                    subscriber.next(message);
                }
            };
            this.redisClient.on("message", messageSubscriber);
            return async () => {
                this.logger.info(`Unsubscribed from ${topic}`);
                this.redisClient.unsubscribe(topic);
                this.redisClient.removeListener("message", messageSubscriber);
            };
        });
    }
    /**
     * Pings the Redis server to check if it's reachable.
     *
     * @returns A Promise resolving to the "PONG" response.
     */
    async ping() {
        return this.redisClient.ping();
    }
    /**
     * Subscribes to a Redis topic.
     *
     * @param topic - The topic to subscribe to.
     */
    subscribeToTopic(topic) {
        this.redisClient.subscribe(topic);
    }
    /**
     * Unsubscribes from a Redis topic.
     *
     * @param topic - The topic to unsubscribe from.
     */
    unsubscribeFromTopic(topic) {
        this.redisClient.unsubscribe(topic);
    }
    /**
     * Starts a Redis transaction.
     *
     * @returns A Promise resolving when the transaction is started.
     */
    async startTransaction() {
        await this.redisClient.multi();
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map