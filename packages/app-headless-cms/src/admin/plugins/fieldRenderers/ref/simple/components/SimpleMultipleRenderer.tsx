import React, { useMemo } from "react";
import { BindComponentRenderProp, CmsModelField } from "~/types";
import { CmsReferenceValue } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { useContentModels } from "./useContentModels";
import { useReferences } from "./useReferences";
import { CheckboxGroup } from "@webiny/admin-ui";
import { Loader } from "./Loader";

interface SimpleMultipleRendererProps {
    bind: BindComponentRenderProp<CmsReferenceValue[] | undefined | null>;
    field: CmsModelField;
}

export const SimpleMultipleRenderer = (props: SimpleMultipleRendererProps) => {
    const { field, bind } = props;

    const values = useMemo(() => {
        return Array.isArray(bind.value) ? bind.value.map(item => item.id) : [];
    }, [bind.value]);

    const { models } = useContentModels({
        field
    });

    const references = useReferences({
        models
    });

    const items = useMemo(() => {
        if (!references.entries) {
            return [];
        }

        return references.entries.map(entry => ({
            label: entry.title,
            value: entry.id
        }));
    }, [references]);

    if (references.loading) {
        return <Loader />;
    }

    return (
        <CheckboxGroup
            {...bind}
            label={field.label}
            description={field.helpText}
            value={values}
            items={items}
            onChange={(values: string[]) => {
                const selectedEntryIds = values.map(value => value.split("#")[0]);
                const selectedItems = references.entries.filter(entry =>
                    selectedEntryIds.includes(entry.entryId)
                );

                bind.onChange(
                    selectedItems.map(({ id, model }) => ({
                        id,
                        modelId: model.modelId
                    }))
                );
            }}
        />
    );
};
