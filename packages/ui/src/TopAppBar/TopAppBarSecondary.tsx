import React from "react";
import { TopAppBar, TopAppBarProps } from "./TopAppBar";

export type TopAppBarSecondaryProps = TopAppBarProps;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `HeaderBar` component from the `@webiny/admin-ui` package instead.
 */
const TopAppBarSecondary = (props: TopAppBarSecondaryProps) => {
    const { style = {}, children, ...other } = props;
    return (
        <TopAppBar {...other} style={style}>
            {children}
        </TopAppBar>
    );
};

export { TopAppBarSecondary };
