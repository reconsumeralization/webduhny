/**
 * File is @internal
 */
import WebinyError from "@webiny/error";
import { CmsModelField } from "~/types";
import { GenericRecord } from "@webiny/api/types";
import { StorageTransformPlugin } from "~/plugins";

const excludeTypes = ["time", "dateTimeWithTimezone"];

const convertFromStorage = (value: unknown): Date | unknown => {
    if (!value) {
        return value;
    }
    try {
        return new Date(value as string);
    } catch {
        console.warn(`Could not transform "${value}" from storage for date field type.`);
        return value;
    }
};

const convertValueToStorage = (field: CmsModelField, value: Date | string | unknown): string => {
    if (value instanceof Date || (value as GenericRecord)?.toISOString) {
        return (value as Date).toISOString();
    } else if (typeof value === "string") {
        return value as string;
    }
    throw new WebinyError("Error converting value to a storage type.", "TO_STORAGE_ERROR", {
        value: value,
        fieldId: field.fieldId,
        storageId: field.storageId
    });
};

export const createDateStorageTransformPlugin = () => {
    return new StorageTransformPlugin({
        fieldType: "datetime",
        name: "headless-cms.storage-transform.date.default",
        fromStorage: async ({ value, field }) => {
            const { type } = field.settings || {};
            if (!value || !type || excludeTypes.includes(type)) {
                return value;
            } else if (field.multipleValues) {
                if (!Array.isArray(value)) {
                    return [];
                }
                const multipleValues = value as string[];
                const results: (Date | unknown)[] = [];
                for (const input of multipleValues) {
                    if (!input || (typeof input === "object" && Object.keys(input).length === 0)) {
                        continue;
                    }
                    const output = convertFromStorage(input);
                    if (!output) {
                        continue;
                    }
                    results.push(output);
                }
                return results;
            }
            return convertFromStorage(value);
        },
        toStorage: async ({ value, field }) => {
            const { type } = field.settings || {};
            if (!value || !type || excludeTypes.includes(type)) {
                return value;
            }
            if (field.multipleValues) {
                const multipleValues = value as (string | Date | null | undefined)[];
                const results: string[] = [];
                for (const input of multipleValues) {
                    if (!input) {
                        continue;
                    }
                    const output = convertValueToStorage(field, input);
                    if (!output) {
                        continue;
                    }
                    results.push(output);
                }
                return results;
            }
            return convertValueToStorage(field, value);
        }
    });
};
