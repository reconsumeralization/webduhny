import type { FolderLevelPermission } from "~/flp/flp.types";

export interface IGetFolderPermission {
    execute: (id: string) => Promise<FolderLevelPermission | null>;
}
