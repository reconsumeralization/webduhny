import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import pako from "pako";
import { IListFoldersGateway, ListFoldersGatewayParams } from "./IListFoldersGateway";
import { AcoError, FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export interface ListFoldersCompressedResponse {
    aco: {
        listFoldersCompressed: {
            data: {
                value: string;
            } | null;
            error: AcoError | null;
        };
    };
}

export interface ListFoldersCompressedQueryVariables {
    type: string;
    limit: number;
    sort?: Record<string, any>;
    after?: string | null;
}

export const LIST_FOLDERS_COMPRESSED = gql`
    query ListFoldersCompressed($type: String!, $limit: Int!) {
        aco {
            listFoldersCompressed(where: { type: $type }, limit: $limit) {
                data {
                    value
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

export class ListFoldersCompressedGqlGateway implements IListFoldersGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute(params: ListFoldersGatewayParams) {
        const { data: response } = await this.client.query<
            ListFoldersCompressedResponse,
            ListFoldersCompressedQueryVariables
        >({
            query: LIST_FOLDERS_COMPRESSED,
            variables: {
                ...params,
                limit: 100000
            },
            fetchPolicy: "network-only"
        });

        if (!response) {
            throw new Error("Network error while listing folders.");
        }

        const { data, error } = response.aco.listFoldersCompressed;

        if (!data) {
            throw new Error(error?.message || "Could not fetch folders");
        }

        const value = pako.inflate(Buffer.from(data.value, "base64"), { to: "string" });
        const folders = JSON.parse(value);

        return [this.getRootFolder(), ...(folders || [])];
    }

    private getRootFolder(): FolderItem {
        return {
            id: ROOT_FOLDER,
            title: "Home",
            permissions: [],
            parentId: "0",
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
