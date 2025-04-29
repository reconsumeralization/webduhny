import React from "react";
import { getRandomId } from "../../../shared/getRandomId";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { useContainer } from "../container/ContainerProvider";
import { FunnelSubmissionFieldModel } from "../../../shared/models/FunnelSubmissionFieldModel";
import styled from "@emotion/styled";

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

const NotWithinFunnelBuilderContainer = styled.div`
    padding: 12px;
`;

export const createFieldRenderer = (
    Component: React.ComponentType<{ field: FunnelSubmissionFieldModel }>
) => {
    return createRenderer(() => {
        const { getElement } = useRenderer();
        const element = getElement();

        const { funnelSubmissionVm } = useContainer();
        if (!funnelSubmissionVm || !funnelSubmissionVm.fieldExists(element.data.fieldId)) {
            return (
                <NotWithinFunnelBuilderContainer>
                    Field not located within the Funnel Builder container.
                </NotWithinFunnelBuilderContainer>
            );
        }

        const field = funnelSubmissionVm.getField(element.data.fieldId);

        return <Component field={field} />;
    });
};
