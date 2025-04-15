import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ContainerAdmin } from "./ContainerAdmin";
import { AdvancedSettings } from "./AdvancedSettings";
import { ELEMENT_TYPE } from "../constants";
import { createFunnelBuilderElement } from "@f/shared/createFunnelBuilderElement";

export const ContainerAdminPlugins = () => (
    <>
        <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={ContainerAdmin} />
        <PbEditorPageElementPlugin
            elementType={ELEMENT_TYPE}
            renderer={ContainerAdmin}
            toolbar={{
                // We use `pb-editor-element-group-media` to put our new
                // page element into the Media group in the left sidebar.
                title: "Funnel Builder",
                group: "pb-editor-element-group-media",
                preview() {
                    // We can return any JSX / React code here. To keep it
                    // simple, we are simply returning the element's name.
                    return <>Funnel Builder</>;
                }
            }}
            settings={[
                "pb-editor-page-element-settings-delete",
                "pb-editor-page-element-settings-visibility",
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-style-settings-width",
                "pb-editor-page-element-style-settings-height",
                "pb-editor-page-element-style-settings-background"
            ]}
            // Defines onto which existing elements our element can be dropped.
            // In most cases, using `["cell", "block"]` will suffice.
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            create={createFunnelBuilderElement}

            // We don't want to allow deleting the main element.
            canDelete={() => false}
        />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={ELEMENT_TYPE}
            element={<AdvancedSettings />}
        />
    </>
);
