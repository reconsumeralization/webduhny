import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { Input } from "./Input";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { AdvancedSettings } from "./AdvancedSettings";
import { ELEMENT_TYPE } from "./constants";
import { FormElementElementData } from "../types";
import { createInitialElementData } from "../utils";

const INITIAL_ELEMENT_DATA: FormElementElementData = createInitialElementData();

export const InputAdmin = () => (
    <>
        <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={Input} />
        <PbEditorPageElementPlugin
            elementType={ELEMENT_TYPE}
            renderer={Input}
            toolbar={{
                // We use `pb-editor-element-group-media` to put our new
                // page element into the Media group in the left sidebar.
                title: "Input",
                group: "pb-editor-element-group-media",
                preview() {
                    // We can return any JSX / React code here. To keep it
                    // simple, we are simply returning the element's name.
                    return <>Input</>;
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
                    elements: [],
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
