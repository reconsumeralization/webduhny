import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";

type ListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

const List = ({ className, ...props }: ListProps) => {
    return (
        <CommandPrimitive.List
            className={cn(
                [
                    "block wby-max-h-96 wby-w-full wby-py-sm wby-overflow-y-auto wby-overflow-x-hidden wby-bg-neutral-base wby-text-neutral-strong"
                ],
                className
            )}
            {...props}
        />
    );
};

export { List, type ListProps };
