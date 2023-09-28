import { Observable } from "rxjs";
import { EmitMessageResponse } from "../types";
/**
 * Initializes the Redis service. 🚀
 */
export declare class RedisService {
    private logger;
    private readonly redisClient;
    /**
     * Initializes the Redis service. 🚀
     * @param logger - The logger instance.
     */
    constructor(logger: any);
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
    /**
     * Sets a key-value pair in Redis.
     *
     * @param key - The key to set.
     * @param value - The value to set for the key.
     * @param expiresIn - Optional expiration time in seconds.
     * @returns A Promise resolving to "OK" on successful set.
     */
    set(key: string, value: string, expiresIn?: number): Promise<string>;
    /**
     * Gets the value associated with a key from Redis.
     *
     * @param key - The key to retrieve the value for.
     * @returns A Promise resolving to the value for the given key, or null if the key is not found.
     */
    get(key: string): Promise<string | null>;
    /**
     * Deletes a key from Redis.
     *
     * @param key - The key to delete.
     * @returns A Promise resolving to the number of keys deleted.
     */
    del(key: string): Promise<number>;
    /**
     * Subscribes to a Redis topic and returns an Observable to receive messages.
     *
     * @param topic - The topic to subscribe to.
     * @returns An Observable emitting messages received on the topic.
     */
    subscribe(topic: string): Observable<string>;
    /**
     * Pings the Redis server to check if it's reachable.
     *
     * @returns A Promise resolving to the "PONG" response.
     */
    ping(): Promise<string>;
    /**
     * Subscribes to a Redis topic.
     *
     * @param topic - The topic to subscribe to.
     */
    subscribeToTopic(topic: string): void;
    /**
     * Unsubscribes from a Redis topic.
     *
     * @param topic - The topic to unsubscribe from.
     */
    unsubscribeFromTopic(topic: string): void;
    /**
     * Starts a Redis transaction.
     *
     * @returns A Promise resolving when the transaction is started.
     */
    startTransaction(): Promise<void>;
}
