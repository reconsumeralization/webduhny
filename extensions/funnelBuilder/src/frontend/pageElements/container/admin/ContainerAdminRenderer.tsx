import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { ContainerAdminEventHandlers } from "./ContainerAdminEventHandlers";
import { ContainerProvider, useContainer } from "../ContainerProvider";
import { useElementWithChildren, useUpdateElement } from "@webiny/app-page-builder/editor";
import { ContainerElementWithChildren } from "../types";
import { FunnelModelDto } from "../../../../shared/models/FunnelModel";
import styled from "@emotion/styled";

const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    border: 1px solid red;
`;

export const ContainerAdmin = () => {
    const { getElement, meta } = useRenderer();
    const element = getElement();
    const elementWithChildren = useElementWithChildren(element.id!) as ContainerElementWithChildren;
    const { funnelVm } = useContainer();

    console.log("funnelVm", funnelVm.getSteps());
    console.log("funnelVm.getActiveStepIndex()", funnelVm.getActiveStepIndex());
    return (
        <>
            <Tabs>
                {funnelVm.getSteps().map((step, index) => {
                    const isActive = index === funnelVm.getActiveStepIndex();
                    return (
                        <div
                            key={step.id}
                            onClick={() => {
                                funnelVm.activateStepIndex(index);
                            }}
                        >
                            {isActive ? (
                                <strong style={{ fontWeight: "bold" }}>{step.title}</strong>
                            ) : (
                                <span>{step.title}</span>
                            )}
                        </div>
                    );
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
