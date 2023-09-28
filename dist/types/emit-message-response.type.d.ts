/**
 * Response object for the `emitMessage` function, representing the status and message. 🚀
 *
 * @typedef {Object} EmitMessageResponse
 * @property {string} status - The status of the emit operation (e.g., "success" or "error"). ✅ or ❌
 * @property {string} message - A message describing the result of the emit operation. 📄
 */
export type EmitMessageResponse = {
    status: string;
    message: string;
};
