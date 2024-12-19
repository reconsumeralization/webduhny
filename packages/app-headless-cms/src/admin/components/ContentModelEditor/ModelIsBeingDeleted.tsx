import React from "react";
import type { CmsModel } from "@webiny/app-headless-cms-common/types";

export interface IModelIsBeingDeletedProps {
    model: Pick<CmsModel, "name">;
}

export const ModelIsBeingDeleted = ({ model }: IModelIsBeingDeletedProps) => {
    return <>Model {model.name} is being deleted. You cannot change it.</>;
};
