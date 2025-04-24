import { ITaskRunParams } from "@webiny/tasks/types";
import { type AcoContext, type Folder } from "~/types";

export type FolderAccessLevel = "owner" | "viewer" | "editor" | "public";

export interface FolderPermission {
    target: string;
    level: FolderAccessLevel;
    inheritedFrom?: string;
}

export interface FolderLevelPermission {
    tenant: string;
    locale: string;
    id: string;
    parentId: string;
    slug: string;
    path: string;
    permissions: FolderPermission[];
    type: string;
}

/********
 * Storage operations
 *******/

export interface ListFlpsParams {
    where: {
        path_startsWith: string;
        type: string;
    };
}

export interface StorageOperationsListFlpsParams {
    where: ListFlpsParams["where"] & {
        tenant: string;
        locale: string;
    };
}

export interface ListDescendantFlpsParams {
    where: {
        parentId: string;
        type: string;
    };
}

export interface StorageOperationsListDescendantFlpsParams {
    where: ListDescendantFlpsParams["where"] & {
        tenant: string;
        locale: string;
    };
}

export interface GetFlpWhere {
    id: string;
    type: string;
}

export interface GetFlpParams {
    where: GetFlpWhere;
}

export interface StorageOperationsGetFlpParams extends GetFlpParams {
    where: GetFlpParams["where"] & {
        tenant: string;
        locale: string;
        type: string;
    };
}

export type StorageOperationsCreateFlpParams = {
    /**
     * The flp data.
     */
    data: FolderLevelPermission;
};

export type StorageOperationsUpdateFlpParams = {
    /**
     * The flp data to be updated.
     */
    original?: FolderLevelPermission;
    /**
     * The flp data with the updated fields.
     */
    data: FolderLevelPermission;
};

export interface DeleteFlpParams {
    flp: FolderLevelPermission;
}

export type StorageOperationsDeleteFlpParams = DeleteFlpParams;

export interface AcoFolderLevelPermissionsStorageOperations {
    list(params: StorageOperationsListFlpsParams): Promise<FolderLevelPermission[]>;
    listDescendants(
        params: StorageOperationsListDescendantFlpsParams
    ): Promise<FolderLevelPermission[]>;
    get(params: StorageOperationsGetFlpParams): Promise<FolderLevelPermission | null>;
    create(params: StorageOperationsCreateFlpParams): Promise<FolderLevelPermission>;
    update(params: StorageOperationsUpdateFlpParams): Promise<FolderLevelPermission>;
    delete(params: StorageOperationsDeleteFlpParams): Promise<void>;
}

export interface AcoFolderLevelPermissionsCrud {
    list(params: ListFlpsParams): Promise<FolderLevelPermission[]>;
    get(where: GetFlpWhere): Promise<FolderLevelPermission | null>;
}

/********
 *  BG Tasks
 *******/

export interface ICreateFlpTaskInput {
    folder: Folder;
}

export type ICreateFlpTaskParams = ITaskRunParams<AcoContext, ICreateFlpTaskInput>;

export interface IUpdateFlpTaskInput {
    folder: Folder;
    original: Folder;
    updated?: Set<string>;
}

export type IUpdateFlpTaskParams = ITaskRunParams<AcoContext, IUpdateFlpTaskInput>;

export interface IDeleteFlpTaskInput {
    folder: Folder;
}

export type IDeleteFlpTaskParams = ITaskRunParams<AcoContext, IDeleteFlpTaskInput>;
