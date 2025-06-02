import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {
    IListFoldersByParentIdsGateway,
    ListFoldersByParentIdsGatewayParams
} from "./IListFoldersByParentIdsGateway";
import { AcoError, FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export interface ListFoldersByParentIdsResponse {
    aco: {
        listFolders: {
            data: FolderItem[] | null;
            error: AcoError | null;
        };
    };
}

export interface ListFoldersByParentIdsQueryVariables {
    type: string;
    parentIds_in: string[];
    limit: number;
    sort?: Record<string, any>;
    after?: string | null;
}

export const LIST_FOLDERS_BY_PARENT_IDS = (FOLDER_FIELDS: string) => gql`
    query ListFoldersByParentIds($type: String!, $parentIds_in: [ID!]!, $limit: Int!) {
        aco {
            listFolders(where: { type: $type, parentId_in: $parentIds_in }, limit: $limit) {
                data ${FOLDER_FIELDS}
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

export class ListFoldersByParentIdsGqlGateway implements IListFoldersByParentIdsGateway {
    private client: ApolloClient<any>;
    private modelFields: string;

    constructor(client: ApolloClient<any>, modelFields: string) {
        this.client = client;
        this.modelFields = modelFields;
    }

    async execute({ parentIds, ...params }: ListFoldersByParentIdsGatewayParams) {
        const { data: response } = await this.client.query<
            ListFoldersByParentIdsResponse,
            ListFoldersByParentIdsQueryVariables
        >({
            query: LIST_FOLDERS_BY_PARENT_IDS(this.modelFields),
            variables: {
                ...params,
                parentIds_in: parentIds,
                limit: 10000
            },
            fetchPolicy: "network-only"
        });

        if (!response) {
            throw new Error("Network error while listing folders.");
        }

        const { data, error } = response.aco.listFolders;

        if (!data) {
            throw new Error(error?.message || "Could not fetch folders");
        }

        return [this.getRootFolder(), ...(data || [])];
    }

    private getRootFolder(): FolderItem {
        return {
            id: ROOT_FOLDER,
            title: "Home",
            permissions: [],
            parentId: "0",
            path: ROOT_FOLDER,
            slug: "",
            createdOn: "",
            createdBy: {
                id: "",
                displayName: "",
                type: ""
            },
            hasNonInheritedPermissions: false,
            canManagePermissions: true,
            canManageStructure: true,
            canManageContent: true,
            savedOn: "",
            savedBy: {
                id: "",
                displayName: "",
                type: ""
            },
            modifiedOn: null,
            modifiedBy: null,
            type: "$ROOT",
            extensions: {}
        };
    }
}
