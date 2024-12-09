import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

type CommandLoadingProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>;

const CommandLoading = (props: CommandLoadingProps) => (
    <CommandPrimitive.Loading
        className="bg-neutral-base text-neutral-strong fill-neutral-xstrong rounded-sm p-sm mx-sm text-md outline-none"
        {...props}
    />
);

export { CommandLoading, type CommandLoadingProps };
