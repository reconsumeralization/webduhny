import React from "react";
import {
    TopAppBarActionItem as RmwcTopAppBarActionItem,
    TopAppBarActionItemProps as RmwcTopAppBarActionItemProps
} from "@rmwc/top-app-bar";

export type TopAppBarActionItemProps = Omit<RmwcTopAppBarActionItemProps, "onChange">;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
const TopAppBarActionItem = (props: TopAppBarActionItemProps) => {
    return <RmwcTopAppBarActionItem {...props} />;
};

export { TopAppBarActionItem };
