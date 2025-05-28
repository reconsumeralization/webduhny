import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { ICreateFolderGateway } from "./ICreateFolderGateway";
import { FolderDto } from "./FolderDto";
import { AcoError, FolderItem } from "~/types";

export interface CreateFolderResponse {
    aco: {
        createFolder: {
            data: FolderItem;
            error: AcoError | null;
        };
    };
}

export interface CreateFolderVariables {
    data: Omit<
        FolderItem,
        | "id"
        | "path"
        | "createdOn"
        | "createdBy"
        | "savedOn"
        | "savedBy"
        | "modifiedOn"
        | "modifiedBy"
        | "hasNonInheritedPermissions"
        | "canManageContent"
        | "canManagePermissions"
        | "canManageStructure"
    >;
}

export const CREATE_FOLDER = (FOLDER_FIELDS: string) => gql`
        mutation CreateFolder($data: FolderCreateInput!) {
            aco {
                createFolder(data: $data) {
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

export class CreateFolderGqlGateway implements ICreateFolderGateway {
    private client: ApolloClient<any>;
    private modelFields: string;

    constructor(client: ApolloClient<any>, modelFields: string) {
        this.client = client;
        this.modelFields = modelFields;
    }

    async execute(folder: FolderDto) {
        const { data: response } = await this.client.mutate<
            CreateFolderResponse,
            CreateFolderVariables
        >({
            mutation: CREATE_FOLDER(this.modelFields),
            variables: {
                data: {
                    ...folder
                }
            }
        });

        if (!response) {
            throw new Error("Network error while creating folder.");
        }

        const { data, error } = response.aco.createFolder;

        if (!data) {
            throw new Error(error?.message || "Could not create folder");
        }

        return data;
    }
}
