import React from "react";
import { Text } from "@webiny/admin-ui";

export type TopAppBarTitleProps = {
    /**
     * Element children
     */
    children: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `HeaderBar` component from the `@webiny/admin-ui` package instead.
 */
const TopAppBarTitle = (props: TopAppBarTitleProps) => {
    return <Text {...props} />;
};

export { TopAppBarTitle };
