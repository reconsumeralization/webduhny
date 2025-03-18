import React from "react";
import bytes from "bytes";
import { Text } from "~/Text";
import { cn } from "~/utils";

interface RichItemDescriptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    name: string;
    size?: number;
    disabled?: boolean;
}

const RichItemDescription = ({ className, disabled, name, size }: RichItemDescriptionProps) => {
    return (
        <div
            className={cn(
                "wby-flex wby-flex-col wby-gap-xxs wby-overflow-hidden wby-flex-1 wby-min-w-0",
                className
            )}
        >
            <Text
                text={name}
                size="sm"
                as="div"
                className={cn(
                    "wby-text-neutral-primary wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                    disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-primary"
                )}
            />
            {size && (
                <Text
                    text={bytes.format(size, { unitSeparator: " " })}
                    size="sm"
                    as="div"
                    className={cn(
                        "wby-text-neutral-muted wby-truncate wby-overflow-hidden wby-whitespace-nowrap wby-w-full",
                        disabled ? "wby-text-neutral-disabled" : "wby-text-neutral-primary"
                    )}
                />
            )}
        </div>
    );
};

export { RichItemDescription, type RichItemDescriptionProps };
