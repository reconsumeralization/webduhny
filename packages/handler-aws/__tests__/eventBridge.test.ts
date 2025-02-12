import { GenericRecord } from "@webiny/cli/types";
import { createEventBridgeEventHandler, createHandler } from "~/index";
import { LambdaContext } from "~/types";

describe("event bridge", () => {
    it("should inject payload into event bridge event", async () => {
        const eventHandler = createEventBridgeEventHandler<
            string,
            string,
            { payload: GenericRecord; testing: boolean }
        >(async request => {
            return {
                payload: request.payload,
                testing: true
            };
        });

        const handler = createHandler({
            plugins: [eventHandler]
        });

        const result = await handler(
            {
                id: "123",
                version: "1",
                account: "2",
                time: "3",
                region: "4",
                resources: ["5"],
                source: "6",
                "detail-type": "myDetailType",
                detail: "myDetail",
                "replay-name": "myReplayName"
            },
            {} as LambdaContext
        );

        expect(result).toEqual({
            payload: {
                id: "123",
                version: "1",
                account: "2",
                time: "3",
                region: "4",
                resources: ["5"],
                source: "6",
                "detail-type": "myDetailType",
                detail: "myDetail",
                "replay-name": "myReplayName"
            },
            testing: true
        });
    });
});
