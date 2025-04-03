import React from "react";
import { TopAppBar, TopAppBarProps } from "./TopAppBar";

export type TopAppBarPrimaryProps = TopAppBarProps;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `HeaderBar` component from the `@webiny/admin-ui` package instead.
 */
const TopAppBarPrimary = (props: TopAppBarPrimaryProps) => {
    const { children, ...other } = props;
    return (
        <TopAppBar {...other} className={"primary"}>
            {children}
        </TopAppBar>
    );
};

export { TopAppBarPrimary };
