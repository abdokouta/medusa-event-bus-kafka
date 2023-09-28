/**
 * Represents the data structure for a job to be processed by the event bus. 📁
 * @template T - The type of data associated with the job.
 */
export type JobData<T> = {
    /**
     * The name of the event associated with the job. 📅
     */
    eventName: string;
    /**
     * The data payload to be processed by event subscribers. 🚀
     */
    data: T;
    /**
     * An optional array of subscriber IDs that have already completed processing the job. 🏁
     */
    completedSubscriberIds?: string[];
};
