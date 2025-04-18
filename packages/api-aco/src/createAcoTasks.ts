import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { flpTasks } from "~/flp";

interface CreateAcoTasksParams {
    documentClient: DynamoDBDocument;
}

export const createAcoTasks = (params: CreateAcoTasksParams) => {
    return [...flpTasks(params)];
};
