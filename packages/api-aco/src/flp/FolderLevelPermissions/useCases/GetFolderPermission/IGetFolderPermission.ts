import type { FolderLevelPermission } from "~/flp/flp.types";

export interface IGetFolderPermission {
    execute: (type: string, id: string) => Promise<FolderLevelPermission | null>;
}
