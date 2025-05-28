import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { IListFoldersGateway, ListFoldersGatewayParams } from "./IListFoldersGateway";
import { AcoError, FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export interface ListFoldersResponse {
    aco: {
        listFolders: {
            data: FolderItem[] | null;
            error: AcoError | null;
        };
    };
}

export interface ListFoldersQueryVariables {
    type: string;
    limit: number;
    sort?: Record<string, any>;
    after?: string | null;
}

export const LIST_FOLDERS = (FOLDER_FIELDS: string) => gql`
    query ListFolders($type: String!, $limit: Int!) {
        aco {
            listFolders(where: { type: $type }, limit: $limit) {
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

export class ListFoldersGqlGateway implements IListFoldersGateway {
    private client: ApolloClient<any>;
    private modelFields: string;

    constructor(client: ApolloClient<any>, modelFields: string) {
        this.client = client;
        this.modelFields = modelFields;
    }

    async execute(params: ListFoldersGatewayParams) {
        const { data: response } = await this.client.query<
            ListFoldersResponse,
            ListFoldersQueryVariables
        >({
            query: LIST_FOLDERS(this.modelFields),
            variables: {
                ...params,
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
