import React from "react";
import { getRandomId } from "../../../shared/getRandomId";
import { FunnelFieldDefinitionModelDto } from "../../../shared/models/FunnelFieldDefinitionModel";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { useContainer } from "../container/ContainerProvider";
import { FunnelSubmissionFieldModel } from "../../../shared/models/FunnelSubmissionFieldModel";
import styled from "@emotion/styled";
import { FunnelFieldValueModelDto } from "../../../shared/models/FunnelFieldValueModel";

export const FUB_PAGE_ELEMENT_GROUP = "funnelBuilder";

export interface CreateInitialFieldDataParams<TValue = unknown, TExtra = Record<string, any>> {
    type: string;
    value: FunnelFieldValueModelDto<TValue>;
    extra: TExtra;
}

export const createInitialFieldData = <TValue = unknown, TExtra = Record<string, any>>(
    params: CreateInitialFieldDataParams<TValue, TExtra>
) => {
    const { type, value, extra } = params;
    return {
        id: getRandomId(),
        fieldId: getRandomId(),
        type,
        label: "",
        helpText: "",
        validators: [],
        value,
        extra
    } as Omit<FunnelFieldDefinitionModelDto<TValue, TExtra>, "stepId">;
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
