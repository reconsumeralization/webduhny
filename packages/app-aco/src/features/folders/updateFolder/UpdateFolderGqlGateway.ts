import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { IUpdateFolderGateway } from "./IUpdateFolderGateway";
import { FolderDto } from "./FolderDto";
import { AcoError, FolderItem } from "~/types";
import { ROOT_FOLDER } from "~/constants";

export interface UpdateFolderResponse {
    aco: {
        updateFolder: {
            data: FolderItem;
            error: AcoError | null;
        };
    };
}

export interface UpdateFolderVariables {
    id: string;
    data: Partial<
        Omit<
            FolderItem,
            "id" | "createdOn" | "createdBy" | "savedOn" | "savedBy" | "modifiedOn" | "modifiedBy"
        >
    >;
}

export const UPDATE_FOLDER = (FOLDER_FIELDS: string) => gql`
    mutation UpdateFolder($id: ID!, $data: FolderUpdateInput!) {
        aco {
            updateFolder(id: $id, data: $data) {
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

export class UpdateFolderGqlGateway implements IUpdateFolderGateway {
    private client: ApolloClient<any>;
    private modelFields: string;

    constructor(client: ApolloClient<any>, modelFields: string) {
        this.client = client;
        this.modelFields = modelFields;
    }

    async execute(folder: FolderDto) {
        const { id, title, slug, permissions, parentId, extensions } = folder;

        const { data: response } = await this.client.mutate<
            UpdateFolderResponse,
            UpdateFolderVariables
        >({
            mutation: UPDATE_FOLDER(this.modelFields),
            variables: {
                id,
                data: {
                    title,
                    slug,
                    extensions,
                    parentId: parentId === ROOT_FOLDER ? null : parentId,
                    permissions: permissions.filter(p => !p.inheritedFrom)
                }
            }
        });

        if (!response) {
            throw new Error("Network error while updating folder.");
        }

        const { data, error } = response.aco.updateFolder;

        if (!data) {
            throw new Error(error?.message || "Could not update folder");
        }

        return data;
    }
}
