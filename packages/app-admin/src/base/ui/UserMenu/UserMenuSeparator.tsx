import React from "react";
import { createVoidComponent, makeDecoratable } from "~/index";
import type { DropdownMenuSeparatorProps } from "@webiny/admin-ui/DropdownMenu/components/DropdownMenuSeparator";

type UserMenuSeparatorRendererProps = DropdownMenuSeparatorProps;

const UserMenuSeparatorRenderer = makeDecoratable(
    "UserMenuSeparatorRenderer",
    createVoidComponent<UserMenuSeparatorRendererProps>()
);

const UserMenuSeparator = makeDecoratable(
    "UserMenuSeparator",
    (props: UserMenuSeparatorRendererProps) => {
        return <UserMenuSeparatorRenderer {...props} />;
    }
);

export { UserMenuSeparator, UserMenuSeparatorRenderer, type UserMenuSeparatorRendererProps };
