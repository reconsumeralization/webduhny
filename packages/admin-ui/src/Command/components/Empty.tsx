import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

type EmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

const Empty = (props: EmptyProps) => (
    <CommandPrimitive.Empty
        className="wby-bg-neutral-base wby-text-neutral-strong wby-fill-neutral-xstrong wby-rounded-sm wby-p-sm wby-mx-sm wby-text-md outline-none"
        {...props}
    />
);

export { Empty, type EmptyProps };
