import { WebinyError } from "@webiny/error";

const minTimeoutInSeconds = 20;
const defaultTimeoutInSeconds = 60;
/**
 * Input is in seconds.
 * Output is milliseconds.
 */
export const getTimeout = (input: number | undefined) => {
    if (input && input > 0) {
        if (input < minTimeoutInSeconds) {
            throw new WebinyError(
                `Timeout cannot be less than ${minTimeoutInSeconds} seconds. Provided: ${input} seconds.`
            );
        }
        return input * 1000;
    }
    const userDefined = process.env.WEBINY_RECORD_LOCK_TIMEOUT
        ? parseInt(process.env.WEBINY_RECORD_LOCK_TIMEOUT)
        : undefined;
    if (!userDefined || isNaN(userDefined) || userDefined <= 0) {
        return defaultTimeoutInSeconds * 1000;
    }
    return userDefined * 1000;
};
