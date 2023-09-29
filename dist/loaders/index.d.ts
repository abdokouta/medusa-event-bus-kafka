import { LoaderOptions } from "@medusajs/modules-sdk";
/**
 * Loads and initializes the Kafka connection and registers it with the IoC container. 🚀
 *
 * @param {LoaderOptions} options - Loader options.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
declare const _default: ({ container, logger: loggerService, options: configService, }: LoaderOptions) => Promise<void>;
export default _default;
