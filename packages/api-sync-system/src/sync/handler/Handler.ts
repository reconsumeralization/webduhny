import type {
    ICommandValue,
    IDynamoDbCommand,
    IHandler,
    IHandlerConverter,
    ISystem
} from "../types.js";
import type {
    EventBridgeClient,
    PutEventsCommandInput,
    PutEventsRequestEntry
} from "@webiny/aws-sdk/client-eventbridge";
import { PutEventsCommand } from "@webiny/aws-sdk/client-eventbridge";
import { convertException } from "@webiny/utils";
import type { IDetail } from "./types.js";
import { SQS_EVENT_NAME } from "~/constants.js";
import { generateAlphaNumericId } from "@webiny/utils/generateId.js";

export interface IHandlerEventBus {
    name: string;
    arn: string;
}

export interface IHandlerParams {
    client: Pick<EventBridgeClient, "send">;
    converter: IHandlerConverter;
    eventBus: IHandlerEventBus;
    system: ISystem;
}

export class Handler implements IHandler {
    public readonly id = generateAlphaNumericId();
    private readonly system: ISystem;
    private readonly client: Pick<EventBridgeClient, "send">;
    private commands: ICommandValue[] = [];
    private readonly converter: IHandlerConverter;
    private readonly eventBus: IHandlerEventBus;

    public constructor(params: IHandlerParams) {
        this.client = params.client;
        this.system = params.system;
        this.converter = params.converter;
        this.eventBus = params.eventBus;
    }

    public add(input: IDynamoDbCommand): void {
        const cmd = this.converter.convert(input);
        this.commands.push(cmd);
    }

    public async flush(): Promise<void> {
        const entries = this.createEventBusEntries();
        if (entries.length === 0) {
            console.log("No commands to flush to Sync System EventBridge.");
            return;
        }
        console.log(
            `Flushing ${entries.length} commands to Sync System EventBridge for system "${this.system.name}".`
        );
        console.log(JSON.stringify({ entries }));

        const input: PutEventsCommandInput = {
            Entries: entries
            /**
             * If we get to the global event bus usage, we will need to set the EndpointId
             */
            // EndpointId: undefined
        };
        const command = new PutEventsCommand(input);

        try {
            await this.client.send(command);
        } catch (ex) {
            console.log("Could not send events to Sync System EventBridge.");
            console.error(ex.message);
            console.error(convertException(ex, ["message"]));
            console.log(
                JSON.stringify({
                    entries: entries.map(entry => entry.Detail)
                })
            );
            throw ex;
        }
    }

    private createEventBusEntries(): PutEventsRequestEntry[] {
        const result = this.commands
            .map((cmd): PutEventsRequestEntry | null => {
                const items = cmd.getItems();
                if (!items?.length) {
                    return null;
                }
                const detail: IDetail = {
                    items,
                    source: this.system
                };
                return {
                    DetailType: SQS_EVENT_NAME,
                    Detail: JSON.stringify(detail),
                    Source: `webiny:${this.system.name}`,
                    EventBusName: this.eventBus.arn
                };
            })
            .filter((item): item is PutEventsRequestEntry => !!item);
        /**
         * Remove all existing commands so we can start fresh.
         */
        this.commands = [];
        return result;
    }
}

export const createSyncHandler = (params: IHandlerParams): IHandler => {
    return new Handler(params);
};
