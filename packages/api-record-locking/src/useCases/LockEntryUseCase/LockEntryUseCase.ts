import WebinyError from "@webiny/error";
import type {
    ILockEntryUseCase,
    ILockEntryUseCaseExecuteParams
} from "~/abstractions/ILockEntryUseCase";
import type {
    IRecordLockingLockRecord,
    IRecordLockingLockRecordValues,
    IRecordLockingModelManager
} from "~/types";
import type { IIsEntryLockedUseCase } from "~/abstractions/IIsEntryLocked";
import { createLockRecordDatabaseId } from "~/utils/lockRecordDatabaseId";
import { NotFoundError } from "@webiny/handler-graphql";
import type { ConvertEntryToLockRecordCb } from "~/useCases/types";
import type { Security, SecurityIdentity } from "@webiny/api-security/types.js";

export interface ILockEntryUseCaseParams {
    isEntryLockedUseCase: IIsEntryLockedUseCase;
    getManager(): Promise<IRecordLockingModelManager>;
    getSecurity(): Pick<Security, "withoutAuthorization">;
    getIdentity(): SecurityIdentity;
    convert: ConvertEntryToLockRecordCb;
}

export class LockEntryUseCase implements ILockEntryUseCase {
    private readonly isEntryLockedUseCase: IIsEntryLockedUseCase;
    private readonly getManager: ILockEntryUseCaseParams["getManager"];
    private readonly getSecurity: ILockEntryUseCaseParams["getSecurity"];
    private readonly getIdentity: ILockEntryUseCaseParams["getIdentity"];
    private readonly convert: ConvertEntryToLockRecordCb;

    public constructor(params: ILockEntryUseCaseParams) {
        this.isEntryLockedUseCase = params.isEntryLockedUseCase;
        this.getManager = params.getManager;
        this.getSecurity = params.getSecurity;
        this.getIdentity = params.getIdentity;
        this.convert = params.convert;
    }

    public async execute(
        params: ILockEntryUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord> {
        let locked = false;
        try {
            locked = await this.isEntryLockedUseCase.execute(params);
        } catch (ex) {
            if (ex instanceof NotFoundError === false) {
                throw ex;
            }
            locked = false;
        }
        if (locked) {
            throw new WebinyError("Entry is already locked for editing.", "ENTRY_ALREADY_LOCKED", {
                ...params
            });
        }
        const security = this.getSecurity();
        const identity = this.getIdentity();
        try {
            const user: SecurityIdentity = {
                id: identity.id,
                displayName: identity.displayName,
                type: identity.type
            };
            const manager = await this.getManager();

            const id = createLockRecordDatabaseId(params.id);
            return await security.withoutAuthorization(async () => {
                const entry = await manager.create<IRecordLockingLockRecordValues>({
                    id,
                    createdBy: user,
                    savedBy: user,
                    targetId: params.id,
                    type: params.type,
                    actions: []
                });
                return this.convert(entry);
            });
        } catch (ex) {
            throw new WebinyError(
                `Could not lock entry: ${ex.message}`,
                ex.code || "LOCK_ENTRY_ERROR",
                {
                    ...ex.data
                }
            );
        }
    }
}
