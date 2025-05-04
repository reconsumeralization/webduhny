import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { useContainer } from "../container/ContainerProvider";
import { FunnelSubmissionFieldModel } from "../../../shared/models/FunnelSubmissionFieldModel";
import styled from "@emotion/styled";
import { fieldFromDto } from "../../../shared/models/fields/fieldFactory";
import { FunnelFieldDefinitionModel } from "../../../shared/models/FunnelFieldDefinitionModel";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export const createInitialFieldData = (fieldType: string) => {
    const field = fieldFromDto({ type: fieldType, stepId: "" });
    return field.toDto();
};

const NotWithinFunnelBuilderContainer = styled.div`
    padding: 12px;
`;

export const createFieldRenderer = <
    TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
>(
    Component: React.ComponentType<{ field: FunnelSubmissionFieldModel<TField> }>
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

        const field = funnelSubmissionVm.getField(element.data.fieldId) ;

        return <Component field={field as FunnelSubmissionFieldModel<TField>} />;
    });
};
