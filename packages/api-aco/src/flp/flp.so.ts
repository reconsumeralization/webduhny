import { Entity, Table } from "@webiny/db-dynamodb/toolbox";
import { DynamoDBDocument } from "../../../aws-sdk/src/client-dynamodb";
import { deleteItem, getClean, put, queryAll } from "@webiny/db-dynamodb";

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

export interface CreateTableParams {
    name?: string;
    documentClient: DynamoDBDocument;
}

interface CreateEntityParams {
    table: Table<string, string, string>;
    name: string;
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
                const entries = await queryAll<{ data: FolderLevelPermission }>({
                    entity: this.entity,
                    partitionKey: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
                    options: {
                        index: "GSI2",
                        eq: parentId
                    }
                });
                return entries.map(entry => entry.data);
            }

            if (path_startsWith) {
                const entries = await queryAll<{ data: FolderLevelPermission }>({
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
    }: StorageOperationsGetFlpParams): Promise<FolderLevelPermission> {
        try {
            const entry = await getClean<{ data: FolderLevelPermission }>({
                entity: this.entity,
                keys: this.createKeys({ tenant, locale, id })
            });

            if (!entry) {
                throw new WebinyError("Could not find folder level permission.", "GET_FLP_ERROR", {
                    tenant,
                    locale,
                    id
                });
            }

            return entry?.data || null;
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
        const keys = {
            ...this.createKeys(original),
            ...this.createGsiKeys(original)
        };

        try {
            const data = {
                ...original,
                ...inputData
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
                data: { keys, inputData, original }
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
                    type: "string"
                },
                GSI1_SK: {
                    type: "string"
                },
                GSI2_PK: {
                    type: "string"
                },
                GSI2_SK: {
                    type: "string"
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

    private createKeys = ({
        id,
        tenant,
        locale
    }: Pick<FolderLevelPermission, "id" | "tenant" | "locale">) => ({
        PK: `T#${tenant}#L#${locale}#FLP#${id}`,
        SK: `A`
    });

    private createGsiKeys = ({
        tenant,
        locale,
        type,
        path,
        parentId
    }: Pick<FolderLevelPermission, "id" | "tenant" | "locale" | "type" | "path" | "parentId">) => ({
        GSI1_PK: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
        GSI1_SK: path,
        GSI2_PK: `T#${tenant}#L#${locale}#AT#${type}#FLP`,
        GSI2_SK: parentId
    });
}

export const createFlpOperations = (params: StorageOperationsConfig) => {
    return new FolderLevelPermissionsStorageOperations(params);
};
