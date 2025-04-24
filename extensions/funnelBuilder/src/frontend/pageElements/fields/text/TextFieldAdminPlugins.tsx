import React from "react";
import { PbEditorPageElementPlugin, PbRenderElementPlugin } from "@webiny/app-page-builder";
import { TextFieldRenderer } from "./TextFieldRenderer";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ELEMENT_TYPE } from "./constants";
import { createInitialFieldData, FUB_PAGE_ELEMENT_GROUP } from "../utils";
import { TextFieldSettings } from "./TextFieldSettings";
import { PbEditorFunnelFieldSettingsPlugin } from "../../../admin/plugins/PbEditorFunnelFieldSettingsPlugin";
import { ReactComponent as TextIcon } from "@material-design-icons/svg/outlined/text_fields.svg";

export const TextFieldAdminPlugins = () => {
    return (
        <>
            <PbRenderElementPlugin elementType={ELEMENT_TYPE} renderer={TextFieldRenderer} />
            <PbEditorPageElementPlugin
                elementType={ELEMENT_TYPE}
                renderer={TextFieldRenderer}
                toolbar={{
                    title: "Short Text",
                    group: FUB_PAGE_ELEMENT_GROUP,
                    preview() {
                        return <TextIcon/>
                         // return <>Titles, names, single line input</>;
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
                        data: createInitialFieldData("text", {
                            inputType: "",
                            placeholderText: ""
                        }),
                        ...options
                    };
                }}
            />

            <PbEditorFunnelFieldSettingsPlugin
                fieldType={"text"}
                // validators={["required", "minLength", "maxLength", "pattern"]}
                renderer={TextFieldSettings}
            />
        </>
    );
};
