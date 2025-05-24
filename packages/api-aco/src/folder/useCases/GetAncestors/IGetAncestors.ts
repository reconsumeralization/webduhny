import { Folder } from "~/folder/folder.types";

export interface GetAncestorsParams {
    folder: Folder;
}

export interface IGetAncestors {
    execute: (params: GetAncestorsParams) => Promise<Folder[]>;
}
