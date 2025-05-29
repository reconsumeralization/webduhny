import type {
    FolderLevelPermissionsTarget,
    FolderLevelPermissionsTargetListMeta
} from "~/folder/folder.types";

export interface IListFolderLevelPermissionsTargets {
    execute: () => Promise<[FolderLevelPermissionsTarget[], FolderLevelPermissionsTargetListMeta]>;
}
