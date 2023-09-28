import { JobsOptions } from "bullmq";
/**
 * Options for emitting events using the EventBusService. These options are forwarded
 * to the Bull queue when adding a new job for event processing. 🚀
 */
export type EmitOptions = JobsOptions;
