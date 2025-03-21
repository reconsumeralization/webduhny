import React from "react";
import { FieldElement } from "@webiny/app-headless-cms-common";
import { useFoldersType } from "@webiny/app-aco";

export type FieldProps = React.ComponentProps<typeof FieldElement>;

export type FolderFieldDecoratorProps = {
    id?: string;
    modelIds?: string[];
};

export const shouldDecorateFolderField = (
    { id, modelIds = [] }: FolderFieldDecoratorProps,
    { field }: FieldProps
) => {
    const [type, modelId] = useFoldersType().split(":");

    if (type !== "cms") {
        return false;
    }

    if (modelIds.length) {
        // If the `modelIds` array does not include the current model, do not decorate
        if (!modelIds.includes(modelId)) {
            return false;
        }

        // Check if the `id` is not defined or equals to "*"
        // If so, decorate it; otherwise, compare it with the current `field` id
        return !id || id === "*" || id === field.id;
    }

    // Same logic as above, applied in case the `modelIds` are not provided
    return !id || id === "*" || id === field.id;
};
