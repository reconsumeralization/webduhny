import React from "react";
import bytes from "bytes";
import { Text } from "~/Text";
import { cn } from "~/utils";
import type { FileItemFormatted } from "~/FilePicker/domain";

interface ItemDescriptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    item: FileItemFormatted;
    disabled?: boolean;
    small?: boolean;
}

const ItemDescription = ({ className, disabled, item, small, ...props }: ItemDescriptionProps) => {
    const formattedSize = item.size && bytes.format(item.size, { unitSeparator: " " });

    return (
        <div
            className={cn(
                "wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0",
                className
            )}
            {...props}
        >
            <Text
                size="sm"
                as="div"
                className={cn(
                    "wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                    disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-primary"
                )}
            >
                {item.name}
            </Text>
            {!small && (formattedSize || item.mimeType) && (
                <Text
                    size="sm"
                    className={cn(
                        "wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                        disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-muted"
                    )}
                >
                    {[formattedSize, item.mimeType].filter(Boolean).join(" - ")}
                </Text>
            )}
        </div>
    );
};

export { ItemDescription, type ItemDescriptionProps };
