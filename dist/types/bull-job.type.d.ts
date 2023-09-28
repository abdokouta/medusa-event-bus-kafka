import { Job } from "bullmq";
import { JobData } from "./job-data.type";
/**
 * Represents a job in the BullMQ queue along with its data. 🐃
 *
 * @template T - The type of data associated with the job.
 */
export type BullJob<T> = {
    /**
     * The data associated with the job.
     */
    data: JobData<T>;
} & Job;
