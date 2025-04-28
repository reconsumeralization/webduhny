import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";
import { useContainer } from "../../container/ContainerProvider";
import { StepElementData } from "../types";

export const StepWebsiteRenderer = createRenderer(() => {
    const { getElement, meta } = useRenderer();
    const element = getElement<StepElementData>();

    const { funnelSubmissionVm } = useContainer();
    if (funnelSubmissionVm.activeStepId !== element.data.step.id) {
        return null;
    }

    return (
        <div>
            <Form
                onSubmit={data => {
                    funnelSubmissionVm.setData(data);
                    funnelSubmissionVm.submitActiveStep();
                }}
            >
                {() => <Elements element={element} />}
            </Form>
        </div>
    );
});
