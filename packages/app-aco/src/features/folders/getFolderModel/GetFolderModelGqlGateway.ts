import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { CmsModel } from "@webiny/app-headless-cms-common/types";
import { IGetFolderModelGateway } from "./IGetFolderModelGateway";
import { AcoError } from "~/types";

export interface GetFolderModelResponse {
    aco: {
        getFolderModel: {
            data: CmsModel;
            error: AcoError | null;
        };
    };
}

export const GET_FOLDER_MODEL = gql`
    query GetFolderModel {
        aco {
            getFolderModel {
                data
                error {
                    code
                    message
                    data
                    stack
                }
            }
        }
    }
`;

export class GetFolderModelGqlGateway implements IGetFolderModelGateway {
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this.client = client;
    }

    async execute() {
        const { data: response } = await this.client.query<GetFolderModelResponse>({
            query: GET_FOLDER_MODEL,
            fetchPolicy: "network-only"
        });

        if (!response) {
            throw new Error("Network error while fetch folder.");
        }

        const { data, error } = response.aco.getFolderModel;

        if (!data) {
            throw new Error(error?.message || `Could not fetch folder model`);
        }

        return data;
    }
}
