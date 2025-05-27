import { IRecordLockingModelManager } from "~/types";

export const createGetManager = () => {
    return async () => {
        return {} as unknown as IRecordLockingModelManager;
    };
};
