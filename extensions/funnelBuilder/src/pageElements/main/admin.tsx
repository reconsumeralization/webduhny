import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { FunnelBuilderAdmin, FunnelBuilderElementData } from "./FunnelBuilderAdmin";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { AdvancedSettings } from "./AdvancedSettings";
import { createElement } from "@webiny/app-page-builder/editor/helpers";
import { ELEMENT_TYPE } from "./constants";

const INITIAL_ELEMENT_DATA: FunnelBuilderElementData = {};

export const Main = () => (
    <>
        <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={FunnelBuilderAdmin} />
        <PbEditorPageElementPlugin
            elementType={ELEMENT_TYPE}
            renderer={FunnelBuilderAdmin}
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
            // Defines which types of element settings are available to the user.
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
            // `create` function creates the initial data for the page element.
            create={options => {
                return {
                    type: ELEMENT_TYPE,

                    // We are immediately creating a grid element inside our new page element.
                    // This was users can start adding content to the grid right away.
                    elements: [createElement("grid")],

                    data: INITIAL_ELEMENT_DATA,
                    ...options
                };
            }}
        />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={ELEMENT_TYPE}
            element={<AdvancedSettings />}
        />
    </>
);
