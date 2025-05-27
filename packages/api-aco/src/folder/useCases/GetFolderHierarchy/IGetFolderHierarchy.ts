import type { GetFolderHierarchyParams, GetFolderHierarchyResponse } from "~/folder/folder.types";

export interface IGetFolderHierarchy {
    execute: (params: GetFolderHierarchyParams) => Promise<GetFolderHierarchyResponse>;
}
