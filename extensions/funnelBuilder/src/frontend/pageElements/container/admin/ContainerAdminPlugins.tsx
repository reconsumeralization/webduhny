import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { ContainerAdminRenderer } from "./ContainerAdminRenderer";
import { AdvancedSettings } from "./AdvancedSettings";
import { createContainerElement } from "../../../../shared/createContainerElement";
import { CONTAINER_ELEMENT_TYPE } from "../../../../shared/constants";
import { FUB_PAGE_ELEMENT_GROUP } from "../../fields/utils";
import { ElementToolbarPreview } from "../../ElementToolbarPreview";
import { ReactComponent as ContainerIcon } from "@material-design-icons/svg/outlined/view_module.svg";

export const ContainerAdminPlugins = () => (
    <>
        <PbRenderElementPlugin
            elementType={CONTAINER_ELEMENT_TYPE}
            renderer={ContainerAdminRenderer}
        />
        <PbEditorPageElementPlugin
            elementType={CONTAINER_ELEMENT_TYPE}
            renderer={ContainerAdminRenderer}
            toolbar={{
                title: "Container Element",
                group: FUB_PAGE_ELEMENT_GROUP,
                preview() {
                    return (
                        <ElementToolbarPreview
                            title={"Container Element"}
                            icon={<ContainerIcon />}
                            description={"Container element that can contain other elements."}
                        />
                    );
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
            //  onDelete={() => {  }}
            create={createContainerElement}
            // We don't want to allow deleting the container element.
            canDelete={() => false}
        />
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={CONTAINER_ELEMENT_TYPE}
            element={<AdvancedSettings />}
        />
    </>
);
