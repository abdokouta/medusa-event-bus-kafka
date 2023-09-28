import { KafkaConfig } from "kafkajs";
/**
 * Constructs Kafka client options based on environment variables. 🚀
 * @param {object} moduleConfig - The module configuration containing environment variables.
 * @returns {KafkaConfig} The Kafka client options. 🌟
 */
export declare const kafkaClientOptions: (moduleConfig: any) => KafkaConfig;
export default kafkaClientOptions;
