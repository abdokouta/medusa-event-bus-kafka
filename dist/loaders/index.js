"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const awilix_1 = require("awilix");
const services_1 = require("../services");
/**
 * Loads and initializes the Kafka connection and registers it with the IoC container. 🚀
 *
 * @param {LoaderOptions} options - Loader options.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
exports.default = async ({ container, logger, options, }) => {
    const { brokers } = options;
    // Ensure Kafka brokers are provided in the configuration. ⚠️
    if (!brokers) {
        throw Error("❗ No Kafka brokers provided in project config. They are required for the Kafka Event Bus.");
    }
    if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
        throw new Error("❗ No `Redis` configurations provided in project config. It is required for the Redis Event Bus.");
    }
    // Initialize a Redis service. 🔄
    const redisService = new services_1.RedisService(logger);
    // Initialize a Kafka service. 🔄
    const kafkaService = new services_1.KafkaService(options, logger);
    try {
        // Create a Redis service connection. 📤
        await redisService.connect();
        // Create a Kafka service connection. 📤
        await kafkaService.connect();
        // Log successful connection. ✅
        logger?.info(`✅ Connection to Kafka in module 'event-bus-kafka' established`);
    }
    catch (err) {
        // Handle connection error and log. ❌
        logger?.error(`❌ An error occurred while connecting to Kafka in module 'event-bus-kafka':${os_1.EOL} ${err}`);
    }
    // Register the Kafka connection with the IoC container. 📦
    container.register({
        kafkaService: (0, awilix_1.asValue)(kafkaService),
        redisService: (0, awilix_1.asValue)(redisService),
    });
};
//# sourceMappingURL=index.js.map