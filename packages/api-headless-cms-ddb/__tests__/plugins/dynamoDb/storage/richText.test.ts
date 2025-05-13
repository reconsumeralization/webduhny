import { createRichTextStorageTransformPlugin } from "~/dynamoDb/storage/richText";
import { FromStorageParams, ToStorageParams } from "@webiny/api-headless-cms";
import { Context } from "@webiny/api/types";
import { compress, getContextWithCompressor } from "~tests/mocks/compressor";

const defaultArgs = {
    field: {
        storageId: "richTextFieldId"
    },
    model: {
        modelId: "richTextModel"
    }
};

const testValue = [
    {
        h1: "big title",
        h2: "small title"
    },
    {
        h3: "subtitle",
        p: "subtitle description"
    },
    {
        number919: 919,
        boolTrue: true,
        boolFalse: false,
        textYes: "yes",
        content: [
            {
                p: "start of the text",
                a: {
                    text: "url",
                    href: "https://www.webiny.com"
                }
            },
            {
                p: "end of the text",
                a: {
                    text: "more url",
                    href: "https://www.webiny.com",
                    target: "_blank"
                }
            }
        ]
    }
];

describe("richTextStoragePlugin", () => {
    let expectedCompressedValue: any;
    let context: Context;
    beforeEach(async () => {
        expectedCompressedValue = await compress(testValue);
        context = getContextWithCompressor();
    });

    test("toStorage should transform value for storage", async () => {
        const plugin = createRichTextStorageTransformPlugin();

        const result = await plugin.toStorage({
            ...defaultArgs,
            value: testValue,
            plugins: context.plugins
        } as unknown as ToStorageParams<any, any>);

        expect(result).toEqual({
            compression: "gzip",
            value: expectedCompressedValue
        });
    });

    test("fromStorage should transform value for output", async () => {
        const value = {
            compression: "gzip",
            value: expectedCompressedValue
        };
        const plugin = createRichTextStorageTransformPlugin();

        const result = await plugin.fromStorage({
            ...defaultArgs,
            value,
            plugins: context.plugins
        } as unknown as FromStorageParams<any, any>);

        expect(result).toEqual(testValue);
    });
});
