import { Topic } from "@webiny/pubsub/types";
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
 * CRUD operations
 *******/

export interface ListFlpsParams {
    where: {
        path_startsWith?: string;
        parentId?: string;
        type: string;
    };
}

export type CreateFlpParams = Pick<
    FolderLevelPermission,
    "id" | "type" | "permissions" | "path" | "parentId" | "slug"
>;

export interface UpdateFlpParams {
    parentId?: string;
    slug?: string;
    path?: string;
    permissions?: FolderPermission[];
    type?: string;
}

export interface OnFlpBeforeCreateTopicParams {
    input: CreateFlpParams;
}

export interface OnFlpAfterCreateTopicParams {
    flp: FolderLevelPermission;
}

export interface OnFlpBeforeUpdateTopicParams {
    original: FolderLevelPermission;
    input: Record<string, any>;
}

export interface OnFlpAfterUpdateTopicParams {
    original: FolderLevelPermission;
    flp: FolderLevelPermission;
    input: Record<string, any>;
}

export interface OnFlpBeforeDeleteTopicParams {
    flp: FolderLevelPermission;
}

export interface OnFlpAfterDeleteTopicParams {
    flp: FolderLevelPermission;
}

export interface AcoFolderLevelPermissionsCrud {
    list(params: ListFlpsParams): Promise<FolderLevelPermission[]>;
    get(id: string): Promise<FolderLevelPermission>;
    create(params: CreateFlpParams): Promise<FolderLevelPermission>;
    update(id: string, data: UpdateFlpParams): Promise<FolderLevelPermission>;
    delete(id: string): Promise<boolean>;
    onFlpBeforeCreate: Topic<OnFlpBeforeCreateTopicParams>;
    onFlpAfterCreate: Topic<OnFlpAfterCreateTopicParams>;
    onFlpBeforeUpdate: Topic<OnFlpBeforeUpdateTopicParams>;
    onFlpAfterUpdate: Topic<OnFlpAfterUpdateTopicParams>;
    onFlpBeforeDelete: Topic<OnFlpBeforeDeleteTopicParams>;
    onFlpAfterDelete: Topic<OnFlpAfterDeleteTopicParams>;
}

/********
 * Storage operations
 *******/

export interface StorageOperationsListFlpsParams {
    where: ListFlpsParams["where"] & {
        tenant: string;
        locale: string;
    };
}

export interface StorageOperationsGetFlpParams {
    tenant: string;
    locale: string;
    id: string;
}

export type StorageOperationsCreateFlpParams = {
    data: FolderLevelPermission;
};

export type StorageOperationsUpdateFlpParams = {
    original: FolderLevelPermission;
    data: UpdateFlpParams;
};

export type StorageOperationsDeleteFlpParams = {
    flp: FolderLevelPermission;
};

export interface AcoFolderLevelPermissionsStorageOperations {
    list(params: StorageOperationsListFlpsParams): Promise<FolderLevelPermission[]>;
    get(params: StorageOperationsGetFlpParams): Promise<FolderLevelPermission>;
    create(params: StorageOperationsCreateFlpParams): Promise<FolderLevelPermission>;
    update(params: StorageOperationsUpdateFlpParams): Promise<FolderLevelPermission>;
    delete(params: StorageOperationsDeleteFlpParams): Promise<void>;
}

/********
 *  Background Tasks
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
