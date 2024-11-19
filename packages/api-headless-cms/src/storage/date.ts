/**
 * File is @internal
 */
import WebinyError from "@webiny/error";
import { CmsModelField } from "~/types";
import { GenericRecord } from "@webiny/api/types";
import { StorageTransformPlugin } from "~/plugins";

const excludeTypes = ["time", "dateTimeWithTimezone"];

const convertFromStorage = (
    field: Pick<CmsModelField, "multipleValues">,
    value: string | string[]
) => {
    try {
        if (field.multipleValues) {
            const result: Date[] = [];
            for (const v of value) {
                if (!v) {
                    continue;
                }
                try {
                    result.push(new Date(v));
                } catch {}
            }
            return result;
        }
        return new Date(value as string);
    } catch {
        console.log(`Could not transform from storage for field type`);
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
            }
            return convertFromStorage(field, value);
        },
        toStorage: async ({ value, field }) => {
            const { type } = field.settings || {};
            if (!value || !type || excludeTypes.includes(type)) {
                return value;
            }
            if (field.multipleValues) {
                const multipleValues = value as (string | Date | null | undefined)[];
                return (multipleValues || [])
                    .map(v => {
                        return convertValueToStorage(field, v);
                    })
                    .filter(v => !!v);
            }
            return convertValueToStorage(field, value);
        }
    });
};
