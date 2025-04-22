import type { IStorer, IStorerExecParams } from "./types";
import type { ISystem } from "~/sync/types.js";
import type { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb/index.js";

export interface IStorerParamsCreateDocumentClientCallable {
    (system: ISystem): Pick<DynamoDBDocument, "send">;
}

export interface IStorerParams {
    createDocumentClient: IStorerParamsCreateDocumentClientCallable;
}

export class Storer implements IStorer {
    private readonly createDocumentClient: IStorerParamsCreateDocumentClientCallable;

    public constructor(params: IStorerParams) {
        this.createDocumentClient = params.createDocumentClient;
    }

    public async exec(params: IStorerExecParams): Promise<void> {
        const { system, table, bundle, items } = params;
    }
}

export const createStorer = (params: IStorerParams): IStorer => {
    return new Storer(params);
};
