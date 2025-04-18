import type { Entity, Table } from "@webiny/db-dynamodb/toolbox";
import { DynamoDBDocument } from "../../../aws-sdk/src/client-dynamodb";
import {
    createStandardEntity,
    createTable,
    deleteItem,
    getClean,
    put,
    queryAll
} from "@webiny/db-dynamodb";

import { WebinyError } from "@webiny/error";
import type {
    AcoFolderLevelPermissionsStorageOperations as IAcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission,
    StorageOperationsCreateFlpParams,
    StorageOperationsDeleteFlpParams,
    StorageOperationsGetFlpParams,
    StorageOperationsListFlpsParams,
    StorageOperationsUpdateFlpParams
} from "~/flp/flp.types";

interface StorageOperationsConfig {
    documentClient: DynamoDBDocument;
}

class FolderLevelPermissionsStorageOperations
    implements IAcoFolderLevelPermissionsStorageOperations
{
    private readonly entity: Entity<any>;
    private readonly table: Table<string, string, string>;

    constructor({ documentClient }: StorageOperationsConfig) {
        this.table = createTable({ documentClient });

        this.entity = createStandardEntity({
            table: this.table,
            name: "ACO.flp"
        });
    }

    async list({
        where: { tenant, locale, type, path_startsWith }
    }: StorageOperationsListFlpsParams): Promise<FolderLevelPermission[]> {
        try {
            const entries = await queryAll<{ data: FolderLevelPermission }>({
                entity: this.entity,
                partitionKey: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
                options: {
                    index: "GSI1",
                    beginsWith: path_startsWith
                }
            });
            return entries.map(entry => entry.data);
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not folder level permissions.",
                code: "LIST_FLP_FOLDER_ERROR"
            });
        }
    }

    async get({
        where: { tenant, locale, type, id }
    }: StorageOperationsGetFlpParams): Promise<FolderLevelPermission | null> {
        try {
            const entry = await getClean<{ data: FolderLevelPermission }>({
                entity: this.entity,
                keys: this.createKeys({ tenant, locale, type, id })
            });

            return entry?.data || null;
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not load folder level permission.",
                code: "GET_FLP_FOLDER_ERROR",
                data: { tenant, locale, type, id }
            });
        }
    }

    async create({ data }: StorageOperationsCreateFlpParams): Promise<FolderLevelPermission> {
        const keys = {
            ...this.createKeys(data),
            ...this.createGsiKeys(data)
        };

        try {
            await put({
                entity: this.entity,
                item: {
                    ...keys,
                    data
                }
            });

            return data;
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not create folder level permission.",
                code: "CREATE_FLP_FOLDER_ERROR",
                data: { keys, data }
            });
        }
    }

    async update({
        data,
        original
    }: StorageOperationsUpdateFlpParams): Promise<FolderLevelPermission> {
        const keys = {
            ...this.createKeys(data),
            ...this.createGsiKeys(data)
        };

        try {
            await put({
                entity: this.entity,
                item: {
                    ...keys,
                    data: {
                        ...(original && original),
                        ...data
                    }
                }
            });
            return data;
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not update folder level permission.",
                code: "UPDATE_FLP_FOLDER_ERROR",
                data: { keys, data, original }
            });
        }
    }

    async delete({ flp }: StorageOperationsDeleteFlpParams): Promise<void> {
        const keys = this.createKeys(flp);

        try {
            await deleteItem({
                entity: this.entity,
                keys
            });
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not delete folder level permission.",
                code: "DELETE_FLP_FOLDER_ERROR",
                data: { keys, flp }
            });
        }
    }

    private createKeys = ({
        id,
        tenant,
        locale,
        type
    }: Pick<FolderLevelPermission, "id" | "tenant" | "locale" | "type">) => ({
        PK: `T#${tenant}#L#${locale}#AT#${type}#FLP#${id}`,
        SK: `A`
    });

    private createGsiKeys = ({
        tenant,
        locale,
        type,
        path
    }: Pick<FolderLevelPermission, "id" | "tenant" | "locale" | "type" | "path">) => ({
        GSI1_PK: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
        GSI1_SK: path
    });
}

export const createFlpOperations = (params: StorageOperationsConfig) => {
    return new FolderLevelPermissionsStorageOperations(params);
};
