import React from "react";

import {
    TopAppBarNavigationIcon as RmwcTopAppBarNavigationIcon,
    TopAppBarNavigationIconProps as RmwcTopAppBarNavigationIconProps
} from "@rmwc/top-app-bar";

export type TopAppBarNavigationIconProps = Omit<RmwcTopAppBarNavigationIconProps, "onChange">;

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
const TopAppBarNavigationIcon = (props: TopAppBarNavigationIconProps) => {
    return <RmwcTopAppBarNavigationIcon {...props} />;
};

export { TopAppBarNavigationIcon };
