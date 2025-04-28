import React from "react";
import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { ContainerProvider } from "../ContainerProvider";

export const ContainerWebsiteRenderer = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();

    return (
        <ContainerProvider>
            <Elements element={element} />
        </ContainerProvider>
    );
});
