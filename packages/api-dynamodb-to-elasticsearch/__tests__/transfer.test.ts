import { createEventHandler, OperationType } from "~/index";
import { createElasticsearchClient } from "@webiny/project-utils/testing/elasticsearch/createClient";
// @ts-expect-error
import { createMockApiLog } from "@webiny/project-utils/testing/mockApiLog";
import { LambdaContext, Reply, Request } from "@webiny/handler-aws/types";
import { marshall } from "@webiny/aws-sdk/client-dynamodb";
import { createMockContext } from "~tests/mocks/context";

describe("transfer data", () => {
    it("should transfer data from event to elasticsearch", async () => {
        const event = createEventHandler();

        const elasticsearch = createElasticsearchClient();

        const context = createMockContext({
            elasticsearch,
            logger: createMockApiLog()
        });

        /**
         * Register index which is going to get created, so it can be deleted after the test.
         */
        const index = "a-test-index";
        elasticsearch.indices.registerIndex(index);

        const result = await event.cb({
            context,
            reply: {} as Reply,
            request: {} as Request,
            event: {
                Records: [
                    {
                        eventName: OperationType.INSERT,
                        dynamodb: {
                            Keys: marshall({
                                PK: "PK_TEST",
                                SK: "SK_TEST"
                            }) as any,
                            NewImage: marshall({
                                index,
                                ignore: false,
                                data: {
                                    title: "Hello World"
                                }
                            }) as any
                        }
                    }
                ]
            },
            lambdaContext: {} as LambdaContext,
            next: jest.fn()
        });

        expect(result).toEqual(null);

        await elasticsearch.indices.deleteAll();
    });
});
