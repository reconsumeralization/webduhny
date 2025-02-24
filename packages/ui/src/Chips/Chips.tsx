import React from "react";
import { cn } from "@webiny/admin-ui";
import { Chip } from "./Chip";

export interface ChipsProps {
    /**
     * Chips to show
     */
    children?: React.ReactElement<typeof Chip> | React.ReactElement<typeof Chip>[];

    /**
     * Is chip disabled?
     */
    disabled?: boolean;

    /**
     * CSS class name
     */
    className?: string;

    /**
     * Style object.
     */
    style?: React.CSSProperties;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Tag` component from the `@webiny/admin-ui` package instead.
 */
export const Chips = (props: ChipsProps) => {
    const { children, className, ...rest } = props;

    return (
        <div
            {...rest}
            className={cn("mdc-evolution-chip-set wby-flex wby-gap-sm wby-py-sm", className)}
        >
            {children}
        </div>
    );
};
