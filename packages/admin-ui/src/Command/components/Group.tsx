import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";

type GroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

const Group = ({ className, ...props }: GroupProps) => (
    <CommandPrimitive.Group
        className={cn(
            "[&_[cmdk-group-heading]]:wby-px-sm [&_[cmdk-group-heading]]:wby-py-xs-plus [&_[cmdk-group-heading]]:wby-text-sm [&_[cmdk-group-heading]]:wby-font-semibold [&_[cmdk-group-heading]]:wby-text-neutral-strong",
            className
        )}
        {...props}
    />
);

export { Group, type GroupProps };
