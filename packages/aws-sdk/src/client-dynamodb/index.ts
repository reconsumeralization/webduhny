export { QueryCommand, ScanInput, ScanOutput, WriteRequest } from "@aws-sdk/client-dynamodb";
export type {
    DynamoDBClient,
    DynamoDBClientConfig,
    AttributeValue
} from "@aws-sdk/client-dynamodb";

export type { StreamRecord } from "@aws-sdk/client-dynamodb-streams";

export {
    BatchWriteCommandInput,
    BatchWriteCommandOutput,
    BatchGetCommandInput,
    BatchGetCommandOutput,
    PutCommandInput,
    PutCommandOutput,
    GetCommandInput,
    GetCommandOutput,
    DeleteCommandInput,
    DeleteCommandOutput,
    BatchWriteCommand,
    BatchGetCommand,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    DynamoDBDocument,
    QueryCommandOutput
} from "@aws-sdk/lib-dynamodb";

export { unmarshall, marshall } from "@aws-sdk/util-dynamodb";

export { getDocumentClient } from "./getDocumentClient";
