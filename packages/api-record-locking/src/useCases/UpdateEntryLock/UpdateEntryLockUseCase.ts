import type {
    IUpdateEntryLockUseCase,
    IUpdateEntryLockUseCaseExecuteParams
} from "~/abstractions/IUpdateEntryLockUseCase";
import type { IGetIdentity, IRecordLockingLockRecord, IRecordLockingModelManager } from "~/types";
import type { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import { WebinyError } from "@webiny/error";
import { createLockRecordDatabaseId } from "~/utils/lockRecordDatabaseId";
import { createIdentifier } from "@webiny/utils";
import { validateSameIdentity } from "~/utils/validateSameIdentity";
import type { ILockEntryUseCase } from "~/abstractions/ILockEntryUseCase";
import type { ConvertEntryToLockRecordCb } from "~/useCases/types";

export interface IUpdateEntryLockUseCaseParams {
    readonly getLockRecordUseCase: IGetLockRecordUseCase;
    readonly lockEntryUseCase: ILockEntryUseCase;
    getManager(): Promise<IRecordLockingModelManager>;
    getIdentity: IGetIdentity;
    convert: ConvertEntryToLockRecordCb;
}

export class UpdateEntryLockUseCase implements IUpdateEntryLockUseCase {
    private readonly getLockRecordUseCase: IGetLockRecordUseCase;
    private readonly lockEntryUseCase: ILockEntryUseCase;
    private readonly getManager: () => Promise<IRecordLockingModelManager>;
    private readonly getIdentity: IGetIdentity;
    private readonly convert: ConvertEntryToLockRecordCb;

    public constructor(params: IUpdateEntryLockUseCaseParams) {
        this.getLockRecordUseCase = params.getLockRecordUseCase;
        this.lockEntryUseCase = params.lockEntryUseCase;
        this.getManager = params.getManager;
        this.getIdentity = params.getIdentity;
        this.convert = params.convert;
    }

    public async execute(
        params: IUpdateEntryLockUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord> {
        const record = await this.getLockRecordUseCase.execute(params);
        if (!record) {
            return this.lockEntryUseCase.execute(params);
        }

        validateSameIdentity({
            getIdentity: this.getIdentity,
            target: record.lockedBy
        });

        try {
            const manager = await this.getManager();

            const entryId = createLockRecordDatabaseId(record.id);
            const id = createIdentifier({
                id: entryId,
                version: 1
            });
            const result = await manager.update(id, {
                savedOn: new Date().toISOString()
            });
            return this.convert(result);
        } catch (ex) {
            throw new WebinyError(
                `Could not update lock entry: ${ex.message}`,
                ex.code || "UPDATE_LOCK_ENTRY_ERROR",
                {
                    ...ex.data
                }
            );
        }
    }
}
