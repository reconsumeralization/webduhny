import { FolderGqlDto } from "./FolderGqlDto";

export interface ListFoldersByParentIdsGatewayParams {
    type: string;
    parentIds: string[];
}

export interface IListFoldersByParentIdsGateway {
    execute: (params: ListFoldersByParentIdsGatewayParams) => Promise<FolderGqlDto[]>;
}
