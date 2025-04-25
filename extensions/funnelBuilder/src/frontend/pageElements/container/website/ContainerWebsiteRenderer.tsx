import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";
import { Form } from "@webiny/form";
import { ContainerProvider, useContainer } from "../ContainerProvider";

const ElementsSection = styled.div<{ activePageIndex: number }>`
    & > webiny-form-container > pb-grid {
        display: none;
    }

    ${props =>
        props.activePageIndex !== undefined &&
        `
        & > webiny-form-container > pb-grid:nth-of-type(${props.activePageIndex + 1}) {
            display: block;
        }
    `}
`;

const CurrentStep = () => {
    const { getElement } = useRenderer();
    const element = getElement();
    const { funnelSubmissionVm } = useContainer();

    const { funnelSubmission } = funnelSubmissionVm;

    console.log('funnelSubmission.getActiveStepIndex()', funnelSubmission.getActiveStepIndex())

    // @ts-ignore
    window.fsub = funnelSubmission;
    return (
        <ElementsSection activePageIndex={funnelSubmission.getActiveStepIndex()}>
            <Form
                onSubmit={data => {
                    funnelSubmission.setData(data);
                    funnelSubmission.submitActiveStep();
                }}
            >
                {() => <Elements element={element} />}
            </Form>
        </ElementsSection>
    );
};

export const ContainerWebsiteRenderer = createRenderer(() => {
    return (
        <ContainerProvider>
            <CurrentStep />
        </ContainerProvider>
    );
});
