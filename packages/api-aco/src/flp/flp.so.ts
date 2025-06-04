import { Entity, Table } from "@webiny/db-dynamodb/toolbox";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { deleteItem, getClean, put, queryAllClean } from "@webiny/db-dynamodb";
import { createEntityWriteBatch } from "@webiny/db-dynamodb/utils/entity/EntityWriteBatch";

import { WebinyError } from "@webiny/error";
import type {
    AcoFolderLevelPermissionsStorageOperations as IAcoFolderLevelPermissionsStorageOperations,
    FolderLevelPermission,
    StorageOperationsCreateFlpParams,
    StorageOperationsDeleteFlpParams,
    StorageOperationsGetFlpParams,
    StorageOperationsListFlpsParams,
    StorageOperationsUpdateFlpParams,
    StorageOperationsBatchUpdateFlpParams
} from "~/flp/flp.types";
import { executeWithRetry } from "@webiny/utils";

interface StorageOperationsConfig {
    documentClient: DynamoDBDocument;
}

export interface CreateTableParams {
    name?: string;
    documentClient: DynamoDBDocument;
}

interface CreateEntityParams {
    table: Table<string, string, string>;
    name: string;
}

interface CreateKeysParams {
    tenant: string;
    locale: string;
    id: string;
}

interface CreateGsiKeysParams {
    tenant: string;
    locale: string;
    id: string;
    type: string;
    path: string;
    parentId: string;
}

class FolderLevelPermissionsStorageOperations
    implements IAcoFolderLevelPermissionsStorageOperations
{
    private readonly entity: Entity<any>;
    private readonly table: Table<string, string, string>;

    constructor({ documentClient }: StorageOperationsConfig) {
        this.table = this.createTable({ documentClient });

        this.entity = this.createEntity({
            table: this.table,
            name: "ACO.flp"
        });
    }

    async list({
        where: { tenant, locale, type, path_startsWith, parentId }
    }: StorageOperationsListFlpsParams): Promise<FolderLevelPermission[]> {
        try {
            if (parentId) {
                const entries = await queryAllClean<{ data: FolderLevelPermission }>({
                    entity: this.entity,
                    partitionKey: `T#${tenant}#L#${locale}#FLP`,
                    options: {
                        index: "GSI2",
                        eq: parentId
                    }
                });
                return entries.map(entry => entry.data);
            }

            if (path_startsWith) {
                const entries = await queryAllClean<{ data: FolderLevelPermission }>({
                    entity: this.entity,
                    partitionKey: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
                    options: {
                        index: "GSI1",
                        beginsWith: path_startsWith
                    }
                });
                return entries.map(entry => entry.data);
            }

            throw new WebinyError("Missing required parameters.", "LIST_FLP_MISSING_PARAMETERS", {
                tenant,
                locale,
                type,
                path_startsWith,
                parentId
            });
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not list folder level permissions.",
                code: "LIST_FLP_ERROR"
            });
        }
    }

    async get({
        tenant,
        locale,
        id
    }: StorageOperationsGetFlpParams): Promise<FolderLevelPermission | null> {
        try {
            const entry = await getClean<{ data: FolderLevelPermission }>({
                entity: this.entity,
                keys: this.createKeys({ tenant, locale, id })
            });

            if (!entry) {
                return null;
            }

            return entry.data;
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not load folder level permission.",
                code: "GET_FLP_ERROR",
                data: { tenant, locale, id }
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
                code: "CREATE_FLP_ERROR",
                data: { keys, data }
            });
        }
    }

    async update({
        data: inputData,
        original
    }: StorageOperationsUpdateFlpParams): Promise<FolderLevelPermission> {
        try {
            const data = {
                ...original,
                ...inputData
            };

            const keys = {
                ...this.createKeys(data),
                ...this.createGsiKeys(data)
            };

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
                message: "Could not update folder level permission.",
                code: "UPDATE_FLP_ERROR",
                data: { inputData, original }
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
                code: "DELETE_FLP_ERROR",
                data: { keys, flp }
            });
        }
    }

    async batchUpdate({
        items
    }: StorageOperationsBatchUpdateFlpParams): Promise<FolderLevelPermission[]> {
        try {
            const batch = createEntityWriteBatch({
                entity: this.entity
            });

            const updatedItems: FolderLevelPermission[] = [];

            for (const { original, data: inputData } of items) {
                const data = {
                    ...original,
                    ...inputData
                };

                const keys = {
                    ...this.createKeys(data),
                    ...this.createGsiKeys(data)
                };

                batch.put({
                    ...keys,
                    data
                });

                updatedItems.push(data);
            }

            await executeWithRetry(async () => {
                return await batch.execute();
            });

            return updatedItems;
        } catch (err) {
            throw WebinyError.from(err, {
                message: "Could not batch update folder level permissions.",
                code: "BATCH_UPDATE_FLP_ERROR",
                data: { items }
            });
        }
    }

    private createEntity = (params: CreateEntityParams): Entity<any> => {
        return new Entity({
            name: params.name,
            table: params.table,
            attributes: {
                PK: {
                    partitionKey: true
                },
                SK: {
                    sortKey: true
                },
                GSI1_PK: {
                    type: "string",
                    required: true
                },
                GSI1_SK: {
                    type: "string",
                    required: true
                },
                GSI2_PK: {
                    type: "string",
                    required: true
                },
                GSI2_SK: {
                    type: "string",
                    required: true
                },
                TYPE: {
                    type: "string"
                },
                data: {
                    type: "map"
                }
            }
        });
    };

    private createTable = ({ name, documentClient }: CreateTableParams) => {
        return new Table({
            name: name || String(process.env.DB_TABLE),
            partitionKey: "PK",
            sortKey: "SK",
            DocumentClient: documentClient,
            indexes: {
                GSI1: {
                    partitionKey: "GSI1_PK",
                    sortKey: "GSI1_SK"
                },
                GSI2: {
                    partitionKey: "GSI2_PK",
                    sortKey: "GSI2_SK"
                }
            },
            autoExecute: true,
            autoParse: true
        });
    };

    private createKeys = ({ id, tenant, locale }: CreateKeysParams) => ({
        PK: `T#${tenant}#L#${locale}#FLP#${id}`,
        SK: `A`
    });

    private createGsiKeys = ({ tenant, locale, type, path, parentId }: CreateGsiKeysParams) => ({
        GSI1_PK: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
        GSI1_SK: path,
        GSI2_PK: `T#${tenant}#L#${locale}#FLP`,
        GSI2_SK: parentId
    });
}

export const createFlpOperations = (params: StorageOperationsConfig) => {
    return new FolderLevelPermissionsStorageOperations(params);
};
