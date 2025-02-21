import type {
    IGetLockRecordUseCase,
    IGetLockRecordUseCaseExecuteParams
} from "~/abstractions/IGetLockRecordUseCase";
import type { IRecordLockingLockRecord, IRecordLockingModelManager } from "~/types";
import { NotFoundError } from "@webiny/handler-graphql";
import { createLockRecordDatabaseId } from "~/utils/lockRecordDatabaseId";
import { createIdentifier } from "@webiny/utils";
import type { ConvertEntryToLockRecordCb } from "~/useCases/types";

export interface IGetLockRecordUseCaseParams {
    getManager(): Promise<IRecordLockingModelManager>;
    convert: ConvertEntryToLockRecordCb;
}

export class GetLockRecordUseCase implements IGetLockRecordUseCase {
    private readonly getManager: IGetLockRecordUseCaseParams["getManager"];
    private readonly convert: ConvertEntryToLockRecordCb;

    public constructor(params: IGetLockRecordUseCaseParams) {
        this.getManager = params.getManager;
        this.convert = params.convert;
    }

    public async execute(
        input: IGetLockRecordUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord | null> {
        const recordId = createLockRecordDatabaseId(input.id);
        const id = createIdentifier({
            id: recordId,
            version: 1
        });
        try {
            const manager = await this.getManager();
            const result = await manager.get(id);
            return this.convert(result);
        } catch (ex) {
            if (ex instanceof NotFoundError) {
                return null;
            }
            throw ex;
        }
    }
}
