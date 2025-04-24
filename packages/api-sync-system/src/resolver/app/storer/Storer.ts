import type { IStorer, IStorerExecParams } from "./types";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";
import type { IDeployment, IDeployments } from "~/resolver/deployment/types.js";
import { createStoreExecute } from "~/resolver/app/storer/StoreExecute.js";

export interface IStorerParamsCreateDocumentClientCallable {
    (deployment: Pick<IDeployment, "region">): Pick<DynamoDBDocument, "send">;
}

export interface IStorerParams {
    createDocumentClient: IStorerParamsCreateDocumentClientCallable;
    deployments: IDeployments;
}

export class Storer implements IStorer {
    private readonly createDocumentClient: IStorerParamsCreateDocumentClientCallable;
    private readonly deployments: IDeployments;

    public constructor(params: IStorerParams) {
        this.createDocumentClient = params.createDocumentClient;
        this.deployments = params.deployments;
    }

    public async exec(params: IStorerExecParams): Promise<void> {
        const { deployment, table, bundle, items } = params;

        const deployments = this.deployments.without(deployment.deployment);
        if (deployments.hasAny() === false) {
            console.error("No deployments found which need to be synced.");
            console.log("Please check your deployed and connected deployments.");
            return;
        }
        const storeExecute = createStoreExecute({});

        for (const deployment of deployments.all()) {
            const client = this.createDocumentClient({
                region: deployment.region
            });
            await storeExecute.execute({
                deployment,
                table: table.name,
                bundle,
                items,
                client
            });
        }
    }
}

export const createStorer = (params: IStorerParams): IStorer => {
    return new Storer(params);
};
