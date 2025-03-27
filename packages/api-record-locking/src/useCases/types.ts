import type { CmsEntry } from "@webiny/api-headless-cms/types";
import type { IRecordLockingLockRecord, IRecordLockingLockRecordValues } from "~/types";

export interface ConvertEntryToLockRecordCb {
    (entry: CmsEntry<IRecordLockingLockRecordValues>): IRecordLockingLockRecord;
}
