import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { useContainer } from "../container/ContainerProvider";
import { FunnelSubmissionFieldModel } from "../../../shared/models/FunnelSubmissionFieldModel";
import { FunnelFieldDefinitionModel } from "../../../shared/models/FunnelFieldDefinitionModel";
import { FormComponentProps, useBind } from "@webiny/form";

const NotWithinFunnelBuilderContainer = styled.div`
    padding: 12px;
`;

export interface FieldRendererProps<
    TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
> extends Required<FormComponentProps> {
    field: FunnelSubmissionFieldModel<TField>;
    isDisabled: boolean;
    isHidden: boolean;
}

export const createFieldRenderer = <
    TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
>(
    Component: React.ComponentType<FieldRendererProps<TField>>
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
        if (field.hidden) {
            return null;
        }

        const { validate, validation, value, onChange } = useBind({
            name: field.definition.fieldId,
            validators: field.definition.validators.map(validator =>
                validator.validate.bind(validator)
            ),
            defaultValue: field.value.value
        });

        return (
            <Component
                isHidden={field.hidden}
                isDisabled={field.disabled}
                validate={validate}
                validation={validation}
                value={value}
                onChange={onChange}
                field={field as FunnelSubmissionFieldModel<TField>}
            />
        );
    });
};
