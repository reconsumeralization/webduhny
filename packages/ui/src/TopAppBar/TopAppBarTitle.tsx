import React from "react";
import { Text } from "@webiny/admin-ui";

export type TopAppBarTitleProps = {
    /**
     * Element children
     */
    children: React.ReactNode;
};

const TopAppBarTitle = (props: TopAppBarTitleProps) => {
    return <Text {...props} />;
};

export { TopAppBarTitle };
