import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { flpTasks } from "~/flp/flp.tasks";

interface CreateAcoTasksParams {
    documentClient: DynamoDBDocument;
}

export const createAcoTasks = (params: CreateAcoTasksParams) => {
    return [flpTasks(params)];
};
