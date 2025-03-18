import React from "react";
import bytes from "bytes";
import { Text } from "~/Text";
import { cn } from "~/utils";

interface ItemDescriptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    name: string;
    size?: number;
    disabled?: boolean;
    small?: boolean;
}

const ItemDescription = ({
    className,
    disabled,
    name,
    size,
    small,
    ...props
}: ItemDescriptionProps) => {
    return (
        <div
            className={cn(
                "wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0",
                className
            )}
            {...props}
        >
            <Text
                text={name}
                size="sm"
                as="div"
                className={cn(
                    "wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                    disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-primary"
                )}
            />
            {size && !small && (
                <Text
                    text={bytes.format(size, { unitSeparator: " " })}
                    size="sm"
                    as="div"
                    className={cn(
                        "wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                        disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-muted"
                    )}
                />
            )}
        </div>
    );
};

export { ItemDescription, type ItemDescriptionProps };
