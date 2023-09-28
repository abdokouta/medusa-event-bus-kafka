"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const bullmq_1 = require("bullmq");
/**
 * 🚀 KafkaEventBusService handles event emission and processing using Kafka and BullMQ.
 */
class KafkaEventBusService extends utils_1.AbstractEventBusModuleService {
    /**
     * Creates an instance of KafkaEventBusService.
     * @param moduleOptions - Options for configuring KafkaEventBusService.
     * @param moduleDeclaration - Internal module declaration.
     * @param injectedDependencies - Injected dependencies like logger and Kafka connection.
     */
    constructor(moduleOptions, moduleDeclaration, { logger, kafkaService, redisService }) {
        super();
        /**
         * Worker method for processing jobs.
         * @param job - The BullMQ job object representing the event to process.
         */
        this.worker_ = async (job) => {
            const { eventName, data } = job.data;
            const eventSubscribers = this.eventToSubscribersMap.get(eventName) || [];
            const wildcardSubscribers = this.eventToSubscribersMap.get("*") || [];
            const allSubscribers = eventSubscribers.concat(wildcardSubscribers);
            // Pull already completed subscribers from the job data
            const completedSubscribers = job.data.completedSubscriberIds || [];
            // Filter out already completed subscribers from the all subscribers
            const subscribersInCurrentAttempt = allSubscribers.filter((subscriber) => subscriber.id && !completedSubscribers.includes(subscriber.id));
            const currentAttempt = job.attemptsMade;
            const isRetry = currentAttempt > 1;
            const configuredAttempts = job.opts.attempts;
            const isFinalAttempt = currentAttempt === configuredAttempts;
            if (isRetry) {
                if (isFinalAttempt) {
                    this.logger_.info(`Final retry attempt for ${eventName}`);
                }
                this.logger_.info(`Retrying ${eventName} which has ${eventSubscribers.length} subscribers (${subscribersInCurrentAttempt.length} of them failed)`);
            }
            else {
                this.logger_.info(`Processing ${eventName} which has ${eventSubscribers.length} subscribers`);
            }
            const completedSubscribersInCurrentAttempt = [];
            const subscribersResult = await Promise.all(subscribersInCurrentAttempt.map(async ({ id, subscriber }) => {
                return await subscriber(data, eventName)
                    .then(async (data) => {
                    completedSubscribersInCurrentAttempt.push(id);
                    return data;
                })
                    .catch((err) => {
                    this.logger_.warn(`An error occurred while processing ${eventName}: ${err}`);
                    return err;
                });
            }));
            const didSubscribersFail = completedSubscribersInCurrentAttempt.length !==
                subscribersInCurrentAttempt.length;
            const isRetriesConfigured = configuredAttempts > 1;
            const shouldRetry = didSubscribersFail && isRetriesConfigured && !isFinalAttempt;
            if (shouldRetry) {
                const updatedCompletedSubscribers = [
                    ...completedSubscribers,
                    ...completedSubscribersInCurrentAttempt,
                ];
                job.data.completedSubscriberIds = updatedCompletedSubscribers;
                await job.update(job.data);
                const errorMessage = `One or more subscribers of ${eventName} failed. Retrying...`;
                this.logger_.warn(errorMessage);
                return Promise.reject(Error(errorMessage));
            }
            if (didSubscribersFail && !isFinalAttempt) {
                this.logger_.warn(`One or more subscribers of ${eventName} failed. Retrying is not configured. Use 'attempts' option when emitting events.`);
            }
            return Promise.resolve(subscribersResult);
        };
        this.logger_ = logger;
        this.moduleOptions_ = moduleOptions;
        this.kafkaService = kafkaService;
        console.log("moduleOptions ====>", moduleOptions);
        console.log("moduleOptions ====>", JSON.stringify(moduleOptions));
        this.queue_ = new bullmq_1.Queue(moduleOptions.queueName ?? `events-queue`, {
            prefix: `${this.constructor.name}`,
            ...(moduleOptions.queueOptions ?? {}),
            connection: redisService,
        });
        // Register our worker to handle emit calls
        new bullmq_1.Worker(moduleOptions.queueName ?? "events-queue", this.worker_, {
            prefix: `${this.constructor.name}`,
            ...(moduleOptions.workerOptions ?? {}),
            connection: redisService,
        });
    }
    /**
     * Core emit method for emitting events.
     * @param eventNameOrData - The name of the event or an array of EmitData objects.
     * @param data - The event data (if eventNameOrData is a string).
     * @param options - Additional options for emitting the event.
     */
    async emit(eventNameOrData, data, options = {}) {
        const globalJobOptions = this.moduleOptions_.jobOptions ?? {};
        const isBulkEmit = Array.isArray(eventNameOrData);
        const opts = {
            removeOnComplete: true,
            attempts: 1,
            ...globalJobOptions,
        };
        const events = isBulkEmit
            ? eventNameOrData.map((event) => ({
                name: event.eventName,
                data: { eventName: event.eventName, data: event.data },
                opts: {
                    ...opts,
                    ...event.options,
                },
            }))
            : [
                {
                    name: eventNameOrData,
                    data: { eventName: eventNameOrData, data },
                    opts: {
                        ...opts,
                        ...options,
                    },
                },
            ];
        await this.queue_.addBulk(events);
        // Produce messages to Kafka topics
        await Promise.all(events.map(async (event) => {
            await this.kafkaService.emitMessage(event.name, JSON.stringify(event.data.data));
        }));
    }
}
exports.default = KafkaEventBusService;
//# sourceMappingURL=event-bus.js.map