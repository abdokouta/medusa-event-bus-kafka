import { IHeaders } from "kafkajs";
/**
 * Initializes the Kafka service. 🚀
 */
export declare class KafkaService {
    private logger;
    private kafkaProducer;
    private readonly kafkaClient;
    /**
     * Initializes the Kafka service. 🚀
     * @param configService - The module configuration.
     * @param loggerService - The loggerService instance.
     */
    constructor(configService: any, loggerService: any);
    /**
     * 🌐 Connects to the Kafka broker.
     */
    connect(): Promise<void>;
    /**
     * Disconnects from the Kafka broker. 🚫
     */
    disconnect(): Promise<void>;
    /**
     * 📤 Emits a Kafka message to the specified topic.
     * @param topic - The Kafka topic to send the message to.
     * @param message - The message payload to send.
     * @param additionalHeaders - Additional headers to include in the message.
     */
    emitMessage(topic: string, message: string, additionalHeaders?: IHeaders): Promise<void>;
}
