import { EmitData, Logger } from "@medusajs/types";
import { AbstractEventBusModuleService } from "@medusajs/utils";
import { InternalModuleDeclaration } from "@medusajs/modules-sdk";
import { Queue } from "bullmq";
import { KafkaService } from "./kafka.service";
import { BullJob } from "../types/bull-job.type";
import { InjectedDependencies } from "../types/injected-dependencies.type";
import { KafkaModuleOptions } from "../types/event-bus-module-options.type";
/**
 * 🚀 KafkaEventBusService handles event emission and processing using Kafka and BullMQ.
 */
export default class KafkaEventBusService extends AbstractEventBusModuleService {
    protected readonly queue_: Queue;
    protected readonly logger: Logger;
    protected readonly moduleOptions_: any;
    protected readonly kafkaService: KafkaService;
    protected readonly moduleDeclaration_: InternalModuleDeclaration;
    /**
     * Creates an instance of KafkaEventBusService.
     * @param moduleOptions - Options for configuring KafkaEventBusService.
     * @param moduleDeclaration - Internal module declaration.
     * @param injectedDependencies - Injected dependencies like loggerService and Kafka connection.
     */
    constructor({ loggerService, kafkaService, redisService }: InjectedDependencies, moduleOptions: KafkaModuleOptions | undefined, moduleDeclaration: InternalModuleDeclaration);
    /**
     * Emit method overloads for emitting events.
     * @param eventName - The name of the event.
     * @param data - The event data.
     * @param options - Additional options for emitting the event.
     */
    emit<T>(eventName: string, data: T, options: Record<string, unknown>): Promise<void>;
    /**
     * Emit method to send multiple events in bulk.
     * @param data - An array of EmitData objects representing events.
     */
    emit<T>(data: EmitData<T>[]): Promise<void>;
    /**
     * Worker method for processing jobs.
     * @param job - The BullMQ job object representing the event to process.
     */
    worker_: <T>(job: BullJob<T>) => Promise<unknown>;
}
