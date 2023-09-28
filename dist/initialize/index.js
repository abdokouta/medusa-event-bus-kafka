"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const modules_sdk_1 = require("@medusajs/modules-sdk");
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
const initialize = async (options) => {
    if (!options) {
        throw new Error("❌ Options are required to initialize the EventBus Kafka module.");
    }
    const serviceKey = modules_sdk_1.Modules.EVENT_BUS;
    // Bootstrap and load the EventBus Kafka module 🌟
    const loaded = await modules_sdk_1.MedusaModule.bootstrap(serviceKey, "@medusajs/event-bus-kafka", options, undefined);
    return loaded[serviceKey];
};
exports.initialize = initialize;
//# sourceMappingURL=index.js.map