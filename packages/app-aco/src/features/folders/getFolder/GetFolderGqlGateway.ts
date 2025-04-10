import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { IGetFolderGateway } from "./IGetFolderGateway";
import { FolderItem, AcoError } from "~/types";

export interface GetFolderResponse {
    aco: {
        getFolder: {
            data: FolderItem | null;
            error: AcoError | null;
        };
    };
}

export interface GetFolderQueryVariables {
    id: string;
}

export const GET_FOLDER = (FOLDER_FIELDS: string) => gql`
    query GetFolder($id: ID!) {
        aco {
            getFolder(id: $id) {
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

export class GetFolderGqlGateway implements IGetFolderGateway {
    private client: ApolloClient<any>;
    private modelFields: string;

    constructor(client: ApolloClient<any>, modelFields: string) {
        this.client = client;
        this.modelFields = modelFields;
    }

    async execute(id: string) {
        if (!id) {
            throw new Error("Folder `id` is mandatory");
        }

        const { data: response } = await this.client.query<
            GetFolderResponse,
            GetFolderQueryVariables
        >({
            query: GET_FOLDER(this.modelFields),
            variables: { id },
            fetchPolicy: "network-only"
        });

        if (!response) {
            throw new Error("Network error while fetch folder.");
        }

        const { data, error } = response.aco.getFolder;

        if (!data) {
            throw new Error(error?.message || `Could not fetch folder with id: ${id}`);
        }

        return data;
    }
}
