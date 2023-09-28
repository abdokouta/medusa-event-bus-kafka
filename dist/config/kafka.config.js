"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaClientOptions = void 0;
const kafkajs_1 = require("kafkajs");
/**
 * Constructs Kafka client options based on environment variables. 🚀
 * @param {object} moduleConfig - The module configuration containing environment variables.
 * @returns {KafkaConfig} The Kafka client options. 🌟
 */
const kafkaClientOptions = (moduleConfig) => {
    // Initialize the Kafka options object
    const clientOptions = {};
    // Brokers configuration, splitting comma-separated values if provided 📡
    clientOptions.brokers = (moduleConfig.brokers || "broker1:9092,broker2:9092").split(",");
    // Logging level, defaults to logLevel.ERROR if not provided 🔍
    clientOptions.logLevel = Number(moduleConfig.logLevel) || kafkajs_1.logLevel.ERROR;
    // Enable SSL if the environment variable is set to "true" 🔒
    clientOptions.ssl = moduleConfig.ssl === "true";
    // Retry configuration with default values if not provided 🔄
    clientOptions.retry = {
        initialRetryTime: Number(moduleConfig.retry?.initialRetryTime) || 100,
        maxRetryTime: Number(moduleConfig.retry?.maxRetryTime) || 3000,
        retries: Number(moduleConfig.retry?.retries) || 10,
    };
    // Check if Kafka authentication is enabled 🔐
    if (moduleConfig.sasl?.enabled === "true") {
        // Determine the SASL mechanism or default to "plain" 🛡️
        const saslMechanism = moduleConfig.sasl?.mechanism || "plain";
        // Set SASL options based on the selected mechanism 🧙‍♂️
        switch (saslMechanism) {
            case "plain":
                clientOptions.sasl = {
                    mechanism: "plain",
                    username: moduleConfig.sasl?.username || "",
                    password: moduleConfig.sasl?.password || "",
                };
                break;
            case "scram-sha-256":
                clientOptions.sasl = {
                    mechanism: "scram-sha-256",
                    username: moduleConfig.sasl?.username || "",
                    password: moduleConfig.sasl?.password || "",
                };
                break;
            case "scram-sha-512":
                clientOptions.sasl = {
                    mechanism: "scram-sha-512",
                    username: moduleConfig.sasl?.username || "",
                    password: moduleConfig.sasl?.password || "",
                };
                break;
            case "aws":
                clientOptions.sasl = {
                    mechanism: "aws",
                    authorizationIdentity: moduleConfig.sasl?.aws?.authorizationIdentity || "",
                    accessKeyId: moduleConfig.sasl?.aws?.accessKeyId || "",
                    sessionToken: moduleConfig.sasl?.aws?.sessionToken || "",
                    secretAccessKey: moduleConfig.sasl?.aws?.secretAccessKey || "",
                };
                break;
            default:
                // Throw an error for unsupported SASL mechanisms ❌
                throw new Error(`❌ Unsupported SASL mechanism: ${saslMechanism}`);
        }
    }
    // Export the constructed Kafka client options 📤
    return clientOptions;
};
exports.kafkaClientOptions = kafkaClientOptions;
// Export the default client options
exports.default = exports.kafkaClientOptions;
//# sourceMappingURL=kafka.config.js.map