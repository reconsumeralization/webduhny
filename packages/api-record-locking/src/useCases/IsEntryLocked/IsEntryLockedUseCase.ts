import type {
    IIsEntryLockedUseCase,
    IIsEntryLockedUseCaseExecuteParams
} from "~/abstractions/IIsEntryLocked";
import type { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import { NotFoundError } from "@webiny/handler-graphql";
import type { IGetIdentity } from "~/types";

export interface IIsEntryLockedParams {
    getLockRecordUseCase: IGetLockRecordUseCase;
    getIdentity: IGetIdentity;
}

export class IsEntryLockedUseCase implements IIsEntryLockedUseCase {
    private readonly getLockRecordUseCase: IGetLockRecordUseCase;
    private readonly getIdentity: IGetIdentity;

    public constructor(params: IIsEntryLockedParams) {
        this.getLockRecordUseCase = params.getLockRecordUseCase;
        this.getIdentity = params.getIdentity;
    }

    public async execute(params: IIsEntryLockedUseCaseExecuteParams): Promise<boolean> {
        try {
            const result = await this.getLockRecordUseCase.execute(params);
            if (!result || result.isExpired()) {
                return false;
            }
            const identity = this.getIdentity();

            return result.lockedBy.id !== identity.id;
        } catch (ex) {
            if (ex instanceof NotFoundError === false) {
                throw ex;
            }
            return false;
        }
    }
}
