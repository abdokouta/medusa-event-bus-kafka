"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClientOptions = void 0;
/**
 * Constructs Redis client options based on environment variables. 🚀
 * @returns {RedisConfig} The Redis client options. 🌟
 */
const redisClientOptions = () => {
    const clientOptions = {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        lazyConnect: true,
    };
    // Export the constructed Redis client options 📤
    return clientOptions;
};
exports.redisClientOptions = redisClientOptions;
// Export the default client options
exports.default = exports.redisClientOptions;
//# sourceMappingURL=redis.config.js.map