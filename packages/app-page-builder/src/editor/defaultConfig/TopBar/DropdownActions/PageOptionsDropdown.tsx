import React from "react";
import { Menu } from "@webiny/ui/Menu";
import { IconButton } from "@webiny/ui/Button";
import { ReactComponent as MoreVerticalIcon } from "@webiny/icons/more_vert.svg";
import { TopBar } from "~/editor/config/TopBar/TopBar";
import { useEditorConfig } from "~/editor/config";

export const PageOptionsDropdown = () => {
    const { elements } = useEditorConfig();
    const dropdownActions = elements.filter(
        el => el.scope === "topBar" && el.group === "dropdownActions"
    );

    if (!dropdownActions.length) {
        return null;
    }

    return (
        <Menu
            data-testid="pb-editor-page-options-menu"
            handle={<IconButton icon={<MoreVerticalIcon />} />}
        >
            {/* We need to have more than 1 element in the children to force the Menu to render as a regular Menu. */}
            <TopBar.Elements group={"dropdownActions"} />
        </Menu>
    );
};
