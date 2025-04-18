import type {
    AcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission
} from "~/flp/flp.types";
import WError from "@webiny/error";

export class DeleteFlp {
    private operations: AcoFolderLevelPermissionsStorageOperations;

    constructor(operations: AcoFolderLevelPermissionsStorageOperations) {
        this.operations = operations;
    }

    public async execute(data: FolderLevelPermission) {
        if (!data) {
            throw new WError(
                "Missing `data`, I can't delete a record into the FLP catalog.",
                "ERROR_FLP_CATALOG_MANAGER_TASK"
            );
        }

        await this.operations.delete({
            flp: data
        });
    }
}
