import React from "react";
import { Scrollbar as AdminScrollbar, type ScrollbarProps } from "@webiny/admin-ui";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `Scrollbar` component props from the `@webiny/admin-ui` package instead.
 */
const Scrollbar = (props: ScrollbarProps) => {
    return <AdminScrollbar {...props} />;
};

export { Scrollbar, type ScrollbarProps };
