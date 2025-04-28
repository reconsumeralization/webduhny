import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { Form } from "@webiny/form";
import { useContainer } from "../../container/ContainerProvider";
import { StepElementData } from "../types";
import { StepElementWithChildren } from "../../container/types";
import { useElementWithChildren } from "@webiny/app-page-builder/editor";

export const StepAdminRenderer = createRenderer(() => {
    const { getElement, meta } = useRenderer();
    const element = getElement<StepElementData>();
    const elementWithChildren = useElementWithChildren(element.id!) as StepElementWithChildren;

    const { funnelVm } = useContainer();

    if (funnelVm.getActiveStepId() !== element.data.step.id) {
        return null;
    }

    return (
        <div>
            <Form>
                {/* @ts-ignore */}
                {() => <Elements element={elementWithChildren} />}
            </Form>
        </div>
    );
});
