import React from "react";
import { CmsModel } from "~/types";
import { OptionsModelListItem } from "./OptionsModelListItem";

interface OptionsModelListProps {
    models: CmsModel[];
    onClick: (modelId: string) => void;
}

export const OptionsModelList = ({ models, onClick }: OptionsModelListProps) => {
    if (models.length <= 1) {
        return null;
    }

    return (
        <>
            {models.map(model => {
                return (
                    <OptionsModelListItem
                        onClick={onClick}
                        key={`model-${model.modelId}`}
                        model={model}
                    />
                );
            })}
        </>
    );
};
