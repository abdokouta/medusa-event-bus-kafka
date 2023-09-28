import { QueueOptions, WorkerOptions } from "bullmq";
import { EmitOptions } from "../types";
/**
 * Options for configuring the EventBus Kafka module. 🚀
 */
export type KafkaModuleOptions = {
    queueName?: string;
    queueOptions?: QueueOptions;
    workerOptions?: WorkerOptions;
    brokers?: string[];
    jobOptions?: EmitOptions;
};
