import { IHeadlessCmsLockRecordParams } from "./convertEntryToLockRecord";

export const calculateExpiresOn = (
    input: Pick<IHeadlessCmsLockRecordParams, "savedOn">,
    timeout: number
): Date => {
    const savedOn = new Date(input.savedOn);

    return new Date(savedOn.getTime() + timeout);
};
