import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { Form } from "@webiny/form";
import { StepProvider, useStep } from "../StepProvider";

const ElementsSection = styled.div<{ activePageIndex: number }>`
    & > webiny-form-step > pb-grid {
        display: none;
    }

    ${props =>
        props.activePageIndex !== undefined &&
        `
        & > webiny-form-step > pb-grid:nth-of-type(${props.activePageIndex + 1}) {
            display: block;
        }
    `}
`;

const CurrentStep = () => {
    const { getElement } = useRenderer();
    const element = getElement();
    const { funnelSubmissionVm } = useStep();

    const { funnelSubmission } = funnelSubmissionVm;

    return (
        <ElementsSection activePageIndex={funnelSubmission.getActiveStepIndex()}>
            <Form
                onSubmit={data => {
                    funnelSubmissionVm.setData(data);
                    funnelSubmissionVm.submitActiveStep();
                }}
            >
                {() => <Elements element={element} />}
            </Form>
        </ElementsSection>
    );
};

export const StepWebsiteRenderer = createRenderer(() => {
    return (
        <StepProvider>
            <CurrentStep />
        </StepProvider>
    );
});
