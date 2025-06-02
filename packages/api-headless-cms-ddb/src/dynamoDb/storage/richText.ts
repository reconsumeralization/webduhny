/**
 * File is @internal
 */
import WebinyError from "@webiny/error";
import { StorageTransformPlugin } from "@webiny/api-headless-cms";
import { CompressorPlugin } from "@webiny/api";

export const createRichTextStorageTransformPlugin = () => {
    return new StorageTransformPlugin({
        name: "headless-cms.storage-transform.rich-text.default",
        fieldType: "rich-text",
        fromStorage: async ({ field, value: storageValue, plugins }) => {
            if (!storageValue) {
                return storageValue;
            } else if (typeof storageValue !== "object") {
                throw new WebinyError(
                    `RichText value received in "fromStorage" function is not an object in field "${field.storageId}" - ${field.fieldId}.`
                );
            }

            let compressor: CompressorPlugin;

            try {
                compressor = plugins.oneByType<CompressorPlugin>(CompressorPlugin.type);
            } catch (ex) {
                return storageValue;
            }

            try {
                const uncompressed = await compressor.getCompressor().decompress(storageValue);

                // We must make sure the rich text value is an object.
                // It is possible that it is a string if developers call the API with an already stringified value.
                if (typeof uncompressed === "string") {
                    return JSON.parse(uncompressed);
                }
                return uncompressed;
            } catch {
                return storageValue;
            }
        },
        toStorage: async ({ value, plugins }) => {
            let compressor: CompressorPlugin;

            try {
                compressor = plugins.oneByType<CompressorPlugin>(CompressorPlugin.type);
            } catch (ex) {
                return value;
            }
            try {
                return await compressor.getCompressor().compress(value);
            } catch {
                return value;
            }
        }
    });
};
