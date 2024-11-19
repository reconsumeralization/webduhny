import pMap from "p-map";
import { StorageTransformPlugin, ToStorageParams } from "~/plugins";
import { GenericRecord } from "@webiny/api/types";
import { CmsModel, CmsModelDynamicZoneField, CmsModelField } from "~/types";
import { PluginsContainer } from "@webiny/plugins";
import pReduce from "p-reduce";

interface IProcessFromStorageParams {
    model: CmsModel;
    field: CmsModelDynamicZoneField;
    value: GenericRecord;
    getStoragePlugin: ToStorageParams<GenericRecord, CmsModelField>["getStoragePlugin"];
    plugins: PluginsContainer;
}

const processToStorage = async (params: IProcessFromStorageParams): Promise<GenericRecord> => {
    const { model, field: parentField, value: input, getStoragePlugin, plugins } = params;

    const output: GenericRecord = structuredClone(input);

    if (!output._templateId) {
        return output;
    }
    const template = parentField.settings.templates.find(t => t.id === output._templateId);
    if (!template || !template.fields.length) {
        return output;
    }

    return await pReduce(
        template.fields,
        async (values, field) => {
            const value = values[field.fieldId];

            if (!value) {
                delete values[field.fieldId];
                return values;
            }
            const plugin = getStoragePlugin(field.type);
            if (!plugin) {
                console.error(`Missing storage plugin for field type "${field.type}".`);
                delete values[field.fieldId];
                return values;
            }
            values[field.fieldId] = await plugin.toStorage({
                plugins,
                getStoragePlugin,
                model,
                field,
                value
            });

            return values;
        },
        output
    );
};

export const createDynamicZoneStorageTransform = (): StorageTransformPlugin => {
    return new StorageTransformPlugin({
        name: "headless-cms.storage-transform.dynamicZone.default",
        fieldType: "dynamicZone",
        toStorage: async ({ field, value, getStoragePlugin, model, plugins }) => {
            if (!value) {
                return null;
            } else if (field.multipleValues) {
                if (!Array.isArray(value)) {
                    return value;
                }
                return await pMap(value as GenericRecord[], async value => {
                    return processToStorage({
                        model,
                        field: field as CmsModelDynamicZoneField,
                        value,
                        getStoragePlugin,
                        plugins
                    });
                });
            }
            return processToStorage({
                model,
                field: field as CmsModelDynamicZoneField,
                value,
                getStoragePlugin,
                plugins
            });
        },
        fromStorage: async ({ value }) => {
            return value;
        }
    });
};
