import { convertEntryToLockRecord as baseConvertEntryToLockRecord } from "~/utils/convertEntryToLockRecord";
import type { CmsEntry } from "@webiny/api-headless-cms/types";
import type { IRecordLockingLockRecordValues } from "~/types";

export const createConvert = () => {
    return (entry: CmsEntry<IRecordLockingLockRecordValues>) => {
        return baseConvertEntryToLockRecord(entry, 20000);
    };
};
