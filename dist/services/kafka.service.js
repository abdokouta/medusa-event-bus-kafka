"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const uuid_1 = require("uuid");
const kafkajs_1 = require("kafkajs");
const config_1 = require("../config");
/**
 * Initializes the Kafka service. 🚀
 */
class KafkaService {
    /**
     * Initializes the Kafka service. 🚀
     * @param moduleConfig - The module configuration.
     * @param logger - The logger instance.
     */
    constructor(moduleConfig, logger) {
        this.logger = logger;
        this.kafkaClient = new kafkajs_1.Kafka((0, config_1.kafkaClientOptions)(moduleConfig));
        this.kafkaProducer = this.kafkaClient.producer();
    }
    /**
     * 🌐 Connects to the Kafka broker.
     */
    async connect() {
        try {
            await this.kafkaProducer.connect();
            this.logger.info("✅ Kafka client connected.");
        }
        catch (error) {
            this.logger.error("❌ Failed to connect to Kafka:", error);
        }
    }
    /**
     * Disconnects from the Kafka broker. 🚫
     */
    async disconnect() {
        try {
            await this.kafkaProducer.disconnect();
            this.logger.info("✅ Kafka client disconnected.");
        }
        catch (error) {
            this.logger.error("❌ Failed to disconnect from Kafka:", error);
        }
    }
    /**
     * 📤 Emits a Kafka message to the specified topic.
     * @param topic - The Kafka topic to send the message to.
     * @param message - The message payload to send.
     * @param additionalHeaders - Additional headers to include in the message.
     */
    async emitMessage(topic, message, additionalHeaders) {
        const timestamp = Date.now().toString();
        const messageId = timestamp;
        // Default headers to include in the message 🪖
        const defaultHeaders = {
            "X-Event-Name": topic,
            "X-Event-Token": (0, uuid_1.v4)(),
            "Content-Type": "application/json",
            "X-Timestamp": timestamp.toString(),
            "X-Event-Source": process.env.APP_NAME,
        };
        const headers = { ...defaultHeaders, ...additionalHeaders };
        const kafkaMessage = {
            key: messageId,
            value: message,
            headers: headers,
            timestamp: timestamp.toString(),
        };
        try {
            await this.kafkaProducer.send({
                topic: topic,
                messages: [kafkaMessage],
            });
            this.logger.info(`✅ Kafka event sent successfully: ${topic}`);
        }
        catch (error) {
            this.logger.error("❌ Failed to send Kafka event:", error);
            // Disconnect from Kafka when an error occurs 🚫
            await this.disconnect();
        }
    }
}
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map