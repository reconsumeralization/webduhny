import React from "react";
import { useActiveElement, useIsElementChildOfType } from "@webiny/app-page-builder/editor";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor";

const { Ui } = TemplateEditorConfig;

export const ElementDataSettings = () => {
    const [element] = useActiveElement();
    const isChildOfEntriesList = useIsElementChildOfType(element, "entries-list");
    const isDisabled = !element || (isChildOfEntriesList && element?.type === "grid");

    return (
        <Ui.Sidebar.Group.Tab
            label={"Data"}
            element={
                <Ui.Sidebar.ScrollableContainer>
                    <Ui.Sidebar.Elements group={"dataSettings"} />
                </Ui.Sidebar.ScrollableContainer>
            }
            disabled={isDisabled}
        />
    );
};
