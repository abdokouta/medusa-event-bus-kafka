/// <reference types="node" />
import * as tls from "tls";
import { QueueOptions, WorkerOptions } from "bullmq";
import { logLevel, logCreator, RetryOptions, ISocketFactory } from "kafkajs";
import { EmitOptions, SaslOptions } from "../types";
/**
 * Options for configuring the EventBus Kafka module. 🚀
 *
 * @typedef {Object} KafkaModuleOptions
 * @property {string} [queueName] - The name of the queue for event processing. 📥
 * @property {QueueOptions} [queueOptions] - Options for configuring the event queue. 🧰
 * @property {WorkerOptions} [workerOptions] - Options for configuring the worker. 🧑‍💻
 * @property {string[]} [brokers] - An array of Kafka broker addresses. 🌐
 * @property {(tls.ConnectionOptions | boolean)} [ssl] - SSL/TLS configuration for Kafka. 🔐
 * @property {SaslOptions} [sasl] - SASL authentication options. 🔒
 * @property {string} [clientId] - The Kafka client ID. 🆔
 * @property {number} [connectionTimeout] - Timeout for establishing a connection (in milliseconds). ⏱️
 * @property {number} [authenticationTimeout] - Timeout for authentication (in milliseconds). ⏱️
 * @property {number} [reauthenticationThreshold] - Threshold for reauthentication. ⏱️
 * @property {number} [requestTimeout] - Timeout for requests (in milliseconds). ⏱️
 * @property {boolean} [enforceRequestTimeout] - Whether to enforce request timeouts. ⏱️
 * @property {RetryOptions} [retry] - Retry options for Kafka operations. 🔄
 * @property {ISocketFactory} [socketFactory] - Socket factory for Kafka connections. 🔌
 * @property {logLevel} [logLevel] - Log level for Kafka logs. 📝
 * @property {logCreator} [logCreator] - Log creator for Kafka logs. 📄
 * @property {EmitOptions} [jobOptions] - Global options for event emission. 🌐
 */
export type KafkaModuleOptions = {
    queueName?: string;
    queueOptions?: QueueOptions;
    workerOptions?: WorkerOptions;
    brokers?: string[];
    ssl?: tls.ConnectionOptions | boolean;
    sasl?: SaslOptions;
    clientId?: string;
    connectionTimeout?: number;
    authenticationTimeout?: number;
    reauthenticationThreshold?: number;
    requestTimeout?: number;
    enforceRequestTimeout?: boolean;
    retry?: RetryOptions;
    socketFactory?: ISocketFactory;
    logLevel?: logLevel;
    logCreator?: logCreator;
    /**
     * Global options passed to all `EventBusService.emit` in the core as well as your own emitters.
     * The options are forwarded to Bull's `Queue.add` method. 🧰
     *
     * The global options can be overridden by passing options to `EventBusService.emit` directly.
     *
     * Example:
     * ```
     * {
     *    removeOnComplete: { age: 10 },
     * }
     * ```
     *
     * @see https://api.docs.bullmq.io/interfaces/BaseJobOptions.html
     */
    jobOptions?: EmitOptions;
};
