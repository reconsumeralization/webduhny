import React from "react";
import { DropdownMenu } from "@webiny/admin-ui";
import { UserMenuLinkRenderer } from "@webiny/app-admin";

export const UserMenuLink = UserMenuLinkRenderer.createDecorator(() => {
    return function UserMenuLinkRenderer(props) {
        return <DropdownMenu.Link {...props} />;
    };
});
