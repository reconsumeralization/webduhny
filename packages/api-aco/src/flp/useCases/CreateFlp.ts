import type {
    AcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission
} from "~/flp/flp.types";
import WError from "@webiny/error";

export class CreateFlp {
    private operations: AcoFolderLevelPermissionsStorageOperations;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
    }

    public async execute(data: FolderLevelPermission) {
        if (!data) {
            throw new WError(
                "Missing `data`, I can't create a new record into the FLP catalog.",
                "ERROR_FLP_CATALOG_MANAGER_TASK"
            );
        }

        await this.operations.create({
            data
        });
    }
}
