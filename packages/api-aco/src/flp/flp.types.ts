import { ITaskRunParams } from "@webiny/tasks/types";
import type { AcoContext, Folder } from "~/types";

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
    };
}

export interface StorageOperationsListFlpsParams extends ListFlpsParams {
    where: ListFlpsParams["where"] & {
        tenant: string;
        locale: string;
        type: string;
    };
}

export interface GetFlpWhere {
    id: string;
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

export interface CreateFlpParams {
    /**
     * The flp data.
     */
    data: FolderLevelPermission;
}

export type StorageOperationsCreateFlpParams = CreateFlpParams;

export interface UpdateFlpParams {
    /**
     * The flp data to be updated.
     */
    original?: FolderLevelPermission;
    /**
     * The flp data with the updated fields.
     */
    data: FolderLevelPermission;
}

export type StorageOperationsUpdateFlpParams = UpdateFlpParams;

export interface DeleteFlpParams {
    flp: FolderLevelPermission;
}

export type StorageOperationsDeleteFlpParams = DeleteFlpParams;

export interface AcoFolderLevelPermissionsStorageOperations {
    list(params: StorageOperationsListFlpsParams): Promise<FolderLevelPermission[]>;
    get(params: StorageOperationsGetFlpParams): Promise<FolderLevelPermission | null>;
    create(params: StorageOperationsCreateFlpParams): Promise<FolderLevelPermission>;
    update(params: StorageOperationsUpdateFlpParams): Promise<FolderLevelPermission>;
    delete(params: StorageOperationsDeleteFlpParams): Promise<void>;
}

/********
 * Catalog Manager - BG Task
 *******/

export interface ICreateFlpTaskInput {
    data: Folder;
}

export type ICreateFlpTaskParams = ITaskRunParams<AcoContext, ICreateFlpTaskInput>;

export interface IUpdateFlpTaskInput {
    data: Folder;
    original: Folder;
    updated?: Set<string>;
}

export type IUpdateFlpTaskParams = ITaskRunParams<AcoContext, IUpdateFlpTaskInput>;

export interface IDeleteFlpTaskInput {
    data: Folder;
}

export type IDeleteFlpTaskParams = ITaskRunParams<AcoContext, IDeleteFlpTaskInput>;
