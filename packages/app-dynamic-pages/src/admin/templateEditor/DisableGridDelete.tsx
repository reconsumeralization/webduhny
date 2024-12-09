import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder";
import { HideIfChildOfEntriesList } from "./HideIfChildOfEntriesList";

const { ElementAction } = TemplateEditorConfig;

export const DisableGridDelete = ElementAction.createDecorator(Original => {
    return function DisableActions(props) {
        if (props.name === "delete") {
            return (
                <Original
                    {...props}
                    element={<HideIfChildOfEntriesList>{props.element}</HideIfChildOfEntriesList>}
                />
            );
        }
        return <Original {...props} />;
    };
});
