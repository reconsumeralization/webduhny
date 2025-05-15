import type { FileManagerStorageOperations } from "~/types";
import type { FilesPermissions } from "./permissions/FilesPermissions";
import type { GetPermissions, SecurityIdentity } from "@webiny/api-security/types";
import type { FileStorage } from "~/storage/FileStorage";
import type { SettingsPermissions } from "./permissions/SettingsPermissions";

export interface FileManagerConfig {
    storageOperations: FileManagerStorageOperations;
    filesPermissions: FilesPermissions;
    settingsPermissions: SettingsPermissions;
    getTenantId: () => string;
    getLocaleCode: () => string;
    getIdentity: () => SecurityIdentity;
    getPermissions: GetPermissions;
    storage: FileStorage;
    WEBINY_VERSION: string;
}
