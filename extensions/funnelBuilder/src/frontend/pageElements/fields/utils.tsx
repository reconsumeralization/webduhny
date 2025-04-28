import React from "react";
import { getRandomId } from "../../../shared/getRandomId";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { useContainer } from "../container/ContainerProvider";
import { FunnelSubmissionFieldModel } from "../../../shared/models/FunnelSubmissionFieldModel";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialFieldData = (fieldType: string, extra: Record<string, any> = {}) => {
    return {
        id: getRandomId(),
        fieldId: getRandomId(),
        type: fieldType,
        label: "",
        helpText: "",
        validators: [],
        extra
    } as Omit<FunnelFieldDefinitionModelDto, "stepId">;
};

export const createFieldRenderer = (
    Component: React.ComponentType<{ field: FunnelSubmissionFieldModel }>
) => {
    return createRenderer(() => {
        const { getElement } = useRenderer();
        const element = getElement();

        const { funnelVm, funnelSubmissionVm } = useContainer();
        if (!funnelVm || !funnelSubmissionVm) {
            return null;
        }

        if (!funnelSubmissionVm.fieldExists(element.data.fieldId)) {
            console.log('💣field does not exist', element.data)
            console.log('funnelSubmissionVm', funnelSubmissionVm)
            return null;
        }

        const field = funnelSubmissionVm.getField(element.data.fieldId);

        return <Component field={field} />;
    });
};
