import type { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import type { IGetIdentity, IRecordLockingLockRecord } from "~/types";
import type {
    IGetLockedEntryLockRecordUseCase,
    IGetLockedEntryLockRecordUseCaseExecuteParams
} from "~/abstractions/IGetLockedEntryLockRecordUseCase";

export interface IGetLockedEntryLockRecordUseCaseParams {
    getLockRecordUseCase: IGetLockRecordUseCase;
    getIdentity: IGetIdentity;
}

/**
 * This use case is used to get a lock record for an entry - and the entry is still locked by someone other than the current user.
 */
export class GetLockedEntryLockRecordUseCase implements IGetLockedEntryLockRecordUseCase {
    private readonly getLockRecordUseCase: IGetLockRecordUseCase;
    private readonly getIdentity: IGetIdentity;

    public constructor(params: IGetLockedEntryLockRecordUseCaseParams) {
        this.getLockRecordUseCase = params.getLockRecordUseCase;
        this.getIdentity = params.getIdentity;
    }

    public async execute(
        params: IGetLockedEntryLockRecordUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord | null> {
        const result = await this.getLockRecordUseCase.execute(params);
        if (!result?.lockedBy?.id || result.isExpired()) {
            return null;
        }
        const identity = this.getIdentity();
        if (identity.id === result.lockedBy.id) {
            return null;
        }
        return result;
    }
}
