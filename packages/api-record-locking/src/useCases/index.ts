import type {
    IGetIdentity,
    IGetWebsocketsContextCallable,
    IHasRecordLockingAccessCallable,
    IRecordLockingModelManager
} from "~/types";
import { GetLockRecordUseCase } from "./GetLockRecord/GetLockRecordUseCase";
import { IsEntryLockedUseCase } from "./IsEntryLocked/IsEntryLockedUseCase";
import { LockEntryUseCase } from "./LockEntryUseCase/LockEntryUseCase";
import { UnlockEntryUseCase } from "./UnlockEntryUseCase/UnlockEntryUseCase";
import { UnlockEntryRequestUseCase } from "./UnlockRequestUseCase/UnlockEntryRequestUseCase";
import { ListAllLockRecordsUseCase } from "./ListAllLockRecordsUseCase/ListAllLockRecordsUseCase";
import { ListLockRecordsUseCase } from "./ListLockRecordsUseCase/ListLockRecordsUseCase";
import { UpdateEntryLockUseCase } from "~/useCases/UpdateEntryLock/UpdateEntryLockUseCase";
import { KickOutCurrentUserUseCase } from "./KickOutCurrentUser/KickOutCurrentUserUseCase";
import { GetLockedEntryLockRecordUseCase } from "~/useCases/GetLockedEntryLockRecord/GetLockedEntryLockRecordUseCase";
import type { IListAllLockRecordsUseCase } from "~/abstractions/IListAllLockRecordsUseCase";
import type { IListLockRecordsUseCase } from "~/abstractions/IListLockRecordsUseCase";
import type { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import type { IIsEntryLockedUseCase } from "~/abstractions/IIsEntryLocked";
import type { IGetLockedEntryLockRecordUseCase } from "~/abstractions/IGetLockedEntryLockRecordUseCase";
import type { ILockEntryUseCase } from "~/abstractions/ILockEntryUseCase";
import type { IUpdateEntryLockUseCase } from "~/abstractions/IUpdateEntryLockUseCase";
import type { IUnlockEntryUseCase } from "~/abstractions/IUnlockEntryUseCase";
import type { IUnlockEntryRequestUseCase } from "~/abstractions/IUnlockEntryRequestUseCase";
import { convertEntryToLockRecord as baseConvertEntryToLockRecord } from "~/utils/convertEntryToLockRecord";
import { ConvertEntryToLockRecordCb } from "~/useCases/types";
import type { Security } from "@webiny/api-security/types";

export interface ICreateUseCasesParams {
    getTimeout: () => number;
    getIdentity: IGetIdentity;
    getManager(): Promise<IRecordLockingModelManager>;
    getSecurity(): Pick<Security, "withoutAuthorization">;
    hasRecordLockingAccess: IHasRecordLockingAccessCallable;
    getWebsockets: IGetWebsocketsContextCallable;
}

export interface ICreateUseCasesResponse {
    listAllLockRecordsUseCase: IListAllLockRecordsUseCase;
    listLockRecordsUseCase: IListLockRecordsUseCase;
    getLockRecordUseCase: IGetLockRecordUseCase;
    isEntryLockedUseCase: IIsEntryLockedUseCase;
    getLockedEntryLockRecordUseCase: IGetLockedEntryLockRecordUseCase;
    lockEntryUseCase: ILockEntryUseCase;
    updateEntryLockUseCase: IUpdateEntryLockUseCase;
    unlockEntryUseCase: IUnlockEntryUseCase;
    unlockEntryRequestUseCase: IUnlockEntryRequestUseCase;
}

export const createUseCases = (params: ICreateUseCasesParams): ICreateUseCasesResponse => {
    const { getTimeout } = params;
    const timeout = getTimeout();

    const convertEntryToLockRecord: ConvertEntryToLockRecordCb = entry => {
        return baseConvertEntryToLockRecord(entry, timeout);
    };

    const listAllLockRecordsUseCase = new ListAllLockRecordsUseCase({
        getManager: params.getManager,
        convert: convertEntryToLockRecord
    });

    const listLockRecordsUseCase = new ListLockRecordsUseCase({
        listAllLockRecordsUseCase,
        timeout,
        getIdentity: params.getIdentity
    });

    const getLockRecordUseCase = new GetLockRecordUseCase({
        getManager: params.getManager,
        getSecurity: params.getSecurity,
        convert: convertEntryToLockRecord
    });

    const isEntryLockedUseCase = new IsEntryLockedUseCase({
        getLockRecordUseCase,
        getIdentity: params.getIdentity
    });

    const getLockedEntryLockRecordUseCase = new GetLockedEntryLockRecordUseCase({
        getLockRecordUseCase,
        getIdentity: params.getIdentity
    });

    const lockEntryUseCase = new LockEntryUseCase({
        isEntryLockedUseCase,
        getManager: params.getManager,
        getSecurity: params.getSecurity,
        getIdentity: params.getIdentity,
        convert: convertEntryToLockRecord
    });

    const updateEntryLockUseCase = new UpdateEntryLockUseCase({
        getLockRecordUseCase,
        lockEntryUseCase,
        getManager: params.getManager,
        getSecurity: params.getSecurity,
        getIdentity: params.getIdentity,
        convert: convertEntryToLockRecord
    });

    const kickOutCurrentUserUseCase = new KickOutCurrentUserUseCase({
        getWebsockets: params.getWebsockets,
        getIdentity: params.getIdentity
    });

    const unlockEntryUseCase = new UnlockEntryUseCase({
        getLockRecordUseCase,
        kickOutCurrentUserUseCase,
        getManager: params.getManager,
        getSecurity: params.getSecurity,
        getIdentity: params.getIdentity,
        hasRecordLockingAccess: params.hasRecordLockingAccess
    });

    const unlockEntryRequestUseCase = new UnlockEntryRequestUseCase({
        getLockRecordUseCase,
        getIdentity: params.getIdentity,
        getSecurity: params.getSecurity,
        getManager: params.getManager,
        convert: convertEntryToLockRecord
    });

    return {
        listAllLockRecordsUseCase,
        listLockRecordsUseCase,
        getLockRecordUseCase,
        isEntryLockedUseCase,
        getLockedEntryLockRecordUseCase,
        lockEntryUseCase,
        updateEntryLockUseCase,
        unlockEntryUseCase,
        unlockEntryRequestUseCase
    };
};
