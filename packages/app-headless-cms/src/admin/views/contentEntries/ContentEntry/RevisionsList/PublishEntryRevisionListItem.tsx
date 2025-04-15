import React from "react";
import { DropdownMenu, type DropdownMenuItemProps } from "@webiny/admin-ui";
import { makeDecoratable } from "@webiny/react-composition";

const PublishEntryRevisionListItemComponent = (props: DropdownMenuItemProps) => {
    return <DropdownMenu.Item {...props} />;
};

export const PublishEntryRevisionListItem = makeDecoratable(
    "PublishEntryRevisionListItem",
    PublishEntryRevisionListItemComponent
);
