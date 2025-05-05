import { IDeployment, IDeploymentServices, type IDeploymentTable } from "./types";
import type { DynamoDBTableType } from "~/types.js";

export interface IDeploymentParams extends Omit<IDeployment, "getTable"> {}

export class Deployment implements IDeployment {
    public readonly name: string;
    public readonly env: string;
    public readonly variant: string | undefined;
    public readonly region: string;
    public readonly services: IDeploymentServices;
    public readonly version: string;

    public constructor(params: IDeploymentParams) {
        this.name = params.name;
        this.env = params.env;
        this.variant = params.variant;
        this.region = params.region;
        this.services = params.services;
        this.version = params.version;
    }

    public getTable(type: DynamoDBTableType): IDeploymentTable {
        switch (type) {
            case "regular":
                return {
                    name: this.services.primaryDynamoDbName,
                    arn: this.services.primaryDynamoDbArn
                };
            case "elasticsearch":
                if (
                    !this.services.elasticsearchDynamodbTableName ||
                    !this.services.elasticsearchDynamodbTableArn
                ) {
                    throw new Error(`Unknown table type "${type}" - no data.`);
                }
                return {
                    name: this.services.elasticsearchDynamodbTableName,
                    arn: this.services.elasticsearchDynamodbTableArn
                };
            case "log":
                return {
                    name: this.services.logDynamodbTableName,
                    arn: this.services.logDynamodbTableName
                };
            default:
                throw new Error(`Unknown table type "${type}".`);
        }
    }
}

export const createDeployment = (params: IDeploymentParams): IDeployment => {
    return new Deployment(params);
};
