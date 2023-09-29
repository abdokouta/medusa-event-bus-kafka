import { Redis } from "ioredis";
import { Logger } from "@medusajs/types";
import { KafkaService } from "../services";
/**
 * Represents the injected dependencies required by the KafkaEventBusService class. 🛠️
 */
export type InjectedDependencies = {
    /**
     * The loggerService instance used for logging within the service. 📝
     */
    loggerService: Logger;
    /**
     * The Kafka service instance for connecting to the Kafka broker. 🌐
     */
    kafkaService: KafkaService;
    /**
     * The Redis service for connecting to the redis instance. 🌐
     */
    redisService: Redis;
};
