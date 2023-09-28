import { ExternalModuleDeclaration } from "@medusajs/modules-sdk";
import { IEventBusService } from "@medusajs/types";
import { KafkaModuleOptions } from "../types";
/**
 * Initializes and loads the EventBus Kafka module for Medusa. 🚀
 *
 * @param {KafkaModuleOptions | ExternalModuleDeclaration} options - Optional configuration options for the EventBus Kafka module.
 *
 * @returns {Promise<IEventBusService>} A promise that resolves to the loaded EventBus service.
 *
 * @throws {Error} If options are not provided.
 *
 * @example
 * const eventBusService = await initialize();
 */
export declare const initialize: (options?: KafkaModuleOptions | ExternalModuleDeclaration) => Promise<IEventBusService>;
