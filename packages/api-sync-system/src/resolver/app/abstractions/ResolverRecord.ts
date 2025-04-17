import type { GenericRecord } from "@webiny/api/types.js";
import type { IDetail } from "~/sync/handler/types.js";
import type { CommandType } from "~/types.js";
import { SQS_EVENT_NAME } from "~/constants.js";

export interface IResolverRecordBodyItem {
    PK: string;
    SK: string;
    command: CommandType;
    /**
     * Table name to which the record belongs.
     * There will be multiple tables that will get populated through the system (regular table and elasticsearch for start).
     */
    tableName: string;
}

export interface IResolverSQSRecordBody {
    version: `${number}`;
    id: string;
    "detail-type": typeof SQS_EVENT_NAME;
    source: string;
    account: `${number}`;
    time: Date;
    region: string;
    resources: unknown[];
    detail: IDetail;
    eventBusName: string;
}

export interface IResolverSQSRecordAttributes {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
}

export interface IResolverSQSRecord {
    messageId: string;
    receiptHandle: string;
    body: IResolverSQSRecordBody;
    attributes: IResolverSQSRecordAttributes;
    messageAttributes?: GenericRecord;
    md5OfBody: string;
    eventSource: string;
    eventSourceARN: string;
    awsRegion: string;
}
