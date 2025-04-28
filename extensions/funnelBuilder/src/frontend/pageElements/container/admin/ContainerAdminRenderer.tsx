import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { Tab, Tabs } from "@webiny/ui/Tabs";
import { ContainerAdminEventHandlers } from "./ContainerAdminEventHandlers";
import { ContainerProvider, useContainer } from "../ContainerProvider";
import { useElementWithChildren, useUpdateElement } from "@webiny/app-page-builder/editor";
import { ContainerElementWithChildren } from "../types";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";

export const ContainerAdmin = () => {
    const { getElement, meta } = useRenderer();
    const element = getElement();
    const elementWithChildren = useElementWithChildren(element.id!) as ContainerElementWithChildren;
    const { funnelVm } = useContainer();

    return (
        <>
            <Tabs onActivate={index => funnelVm.activateStepIndex(index)}>
                {funnelVm.getSteps().map(step => {
                    return <Tab key={step.id} label={step.title} />;
                })}
            </Tabs>

            {/* @ts-ignore Had an issue with types here. It's fine to ignore. */}
            <Elements element={elementWithChildren} />
        </>
    );
};

export const ContainerAdminRenderer = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();
    const updateElement = useUpdateElement();

    const updateContainerElementData = (data: FunnelModelDto) => {
        updateElement(
            {
                ...element,
                data: {
                    ...element.data,
                    ...data
                }
            },
            // Ensures change is stored in history and page is updated on the backend.
            { history: true }
        );
    };

    return (
        <div>
            <ContainerProvider updateElementData={updateContainerElementData}>
                <ContainerAdminEventHandlers />
                <ContainerAdmin />
            </ContainerProvider>
        </div>
    );
});
