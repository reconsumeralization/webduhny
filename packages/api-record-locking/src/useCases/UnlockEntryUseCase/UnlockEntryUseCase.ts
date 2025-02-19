import WebinyError from "@webiny/error";
import type {
    IUnlockEntryUseCase,
    IUnlockEntryUseCaseExecuteParams
} from "~/abstractions/IUnlockEntryUseCase";
import type {
    IGetIdentity,
    IHasRecordLockingAccessCallable,
    IRecordLockingLockRecord,
    IRecordLockingModelManager
} from "~/types";
import { createLockRecordDatabaseId } from "~/utils/lockRecordDatabaseId";
import type { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import { validateSameIdentity } from "~/utils/validateSameIdentity";
import { NotAuthorizedError } from "@webiny/api-security";
import type { IKickOutCurrentUserUseCase } from "~/abstractions/IKickOutCurrentUserUseCase";
import { NotFoundError } from "@webiny/handler-graphql";

export interface IUnlockEntryUseCaseParams {
    readonly getLockRecordUseCase: IGetLockRecordUseCase;
    readonly kickOutCurrentUserUseCase: IKickOutCurrentUserUseCase;
    getManager(): Promise<IRecordLockingModelManager>;
    getIdentity: IGetIdentity;
    hasRecordLockingAccess: IHasRecordLockingAccessCallable;
}

export class UnlockEntryUseCase implements IUnlockEntryUseCase {
    private readonly getLockRecordUseCase: IGetLockRecordUseCase;
    private readonly kickOutCurrentUserUseCase: IKickOutCurrentUserUseCase;
    private readonly getManager: () => Promise<IRecordLockingModelManager>;
    private readonly getIdentity: IGetIdentity;
    private readonly hasRecordLockingAccess: IHasRecordLockingAccessCallable;

    public constructor(params: IUnlockEntryUseCaseParams) {
        this.getLockRecordUseCase = params.getLockRecordUseCase;
        this.kickOutCurrentUserUseCase = params.kickOutCurrentUserUseCase;
        this.getManager = params.getManager;
        this.getIdentity = params.getIdentity;
        this.hasRecordLockingAccess = params.hasRecordLockingAccess;
    }

    public async execute(
        params: IUnlockEntryUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord> {
        const record = await this.getLockRecordUseCase.execute(params);
        if (!record) {
            try {
                const manager = await this.getManager();
                await manager.delete(createLockRecordDatabaseId(params.id), {
                    force: true,
                    permanently: true
                });
            } catch (ex) {
                if (ex instanceof NotFoundError === false) {
                    console.log("Could not forcefully delete lock record.");
                    console.error(ex);
                }
            }

            throw new WebinyError("Lock Record not found.", "LOCK_RECORD_NOT_FOUND", {
                ...params
            });
        }

        /**
         * We need to validate that the user executing unlock is the same user that locked the entry.
         * In case it is not the same user, there is a possibility that it is a user which has full access,
         * and at that point, we allow unlocking, but we also need to message the user who locked the entry.
         *
         */
        let kickOutCurrentUser = false;
        try {
            validateSameIdentity({
                getIdentity: this.getIdentity,
                target: record.lockedBy
            });
        } catch (ex) {
            if (!params.force) {
                throw ex;
            }
            const hasAccess = await this.hasRecordLockingAccess();
            if (ex instanceof NotAuthorizedError === false || !hasAccess) {
                throw ex;
            }

            kickOutCurrentUser = true;
        }

        try {
            const manager = await this.getManager();
            await manager.delete(createLockRecordDatabaseId(params.id), {
                force: true,
                permanently: true
            });

            if (!kickOutCurrentUser) {
                return record;
            }
            await this.kickOutCurrentUserUseCase.execute(record);
            return record;
        } catch (ex) {
            throw new WebinyError(
                `Could not unlock entry: ${ex.message}`,
                ex.code || "UNLOCK_ENTRY_ERROR",
                {
                    ...ex.data
                }
            );
        }
    }
}
