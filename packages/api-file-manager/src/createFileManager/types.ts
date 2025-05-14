import type { FileManagerStorageOperations } from "~/types.js";
import type { FilesPermissions } from "./permissions/FilesPermissions.js";
import type { GetPermissions, SecurityIdentity } from "@webiny/api-security/types.js";
import type { FileStorage } from "~/storage/FileStorage.js";
import type { SettingsPermissions } from "./permissions/SettingsPermissions.js";

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
