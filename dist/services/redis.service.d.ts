import { EmitMessageResponse } from "../types";
/**
 * Initializes the Redis service. 🚀
 */
export declare class RedisService {
    private logger;
    private readonly redisClient;
    /**
     * Initializes the Redis service. 🚀
     * @param loggerService - The loggerService instance.
     */
    constructor(loggerService: any);
    /**
     * 🌐 Connects to the Redis broker.
     */
    connect(): Promise<void>;
    /**
     * Disconnects from the Redis broker. 🚫
     */
    disconnect(): Promise<void>;
    /**
     * 📤 Emits a Redis message to the specified topic.
     * @param topic - The Redis topic to send the message to.
     * @param message - The message payload to send.
     * @param additionalHeaders - Additional headers to include in the message.
     * @returns {Promise<{ status: string, message: string }>} An object with status and message.
     */
    emitMessage(topic: any, message: any): Promise<EmitMessageResponse>;
}
