import { SASLOptions, Mechanism } from "kafkajs";
/**
 * Configuration options for SASL authentication in Kafka. 🐘
 * This type can be used to specify SASL mechanisms and their related settings.
 *
 * @example
 * ```typescript
 * const saslOptions: SaslOptions = {
 *   mechanism: "plain",
 *   username: "yourUsername",
 *   password: "yourPassword",
 * };
 *
 * const kafkaOptions: KafkaOptions = {
 *   sasl: saslOptions,
 *   // Other Kafka configuration options...
 * };
 * ```
 */
export type SaslOptions = SASLOptions | (Mechanism & {
    /**
     * Determines whether SASL authentication is enabled. Set to `true` to enable SASL authentication. ✅
     * If not specified or set to `false`, SASL authentication is considered disabled. ❌
     */
    enabled?: boolean;
});
