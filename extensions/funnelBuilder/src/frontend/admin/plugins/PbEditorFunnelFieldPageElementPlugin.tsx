import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { Typography } from "@webiny/ui/Typography";
import styled from "@emotion/styled";
import type { Renderer } from "@webiny/app-page-builder-elements/types";
import { createFieldElementType } from "../../../shared/constants";
import { createInitialFieldData, FUB_PAGE_ELEMENT_GROUP } from "../../pageElements/fields/utils";

const StyledPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

export interface PbEditorFunnelFieldPageElementPluginProps {
    fieldType: string;
    renderer: Renderer;
    name: string;
    description: string;
    icon: React.ReactNode;
    extraFieldData: Record<string, any>;
}

export const PbEditorFunnelFieldPageElementPlugin = (
    props: PbEditorFunnelFieldPageElementPluginProps
) => {
    const fieldType = props.fieldType;
    const pbElementType = createFieldElementType(fieldType);
    return (
        <PbEditorPageElementPlugin
            elementType={pbElementType}
            renderer={props.renderer}
            toolbar={{
                title: props.name,
                group: FUB_PAGE_ELEMENT_GROUP,
                preview() {
                    return (
                        <StyledPreview>
                            {props.icon}
                            <Typography use={"headline6"}>{props.name}</Typography>
                            <Typography use={"body2"}>{props.description}</Typography>
                        </StyledPreview>
                    );
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
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            // `create` function creates the initial data for the page element.
            create={options => {
                const extraFieldData = structuredClone(props.extraFieldData);
                return {
                    type: pbElementType,
                    elements: [],
                    data: createInitialFieldData(fieldType, extraFieldData),
                    ...options
                };
            }}
        />
    );
};
