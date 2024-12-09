import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

const CommandEmpty = (props: CommandEmptyProps) => (
    <CommandPrimitive.Empty
        className="bg-neutral-base text-neutral-strong fill-neutral-xstrong rounded-sm p-sm mx-sm text-md outline-none"
        {...props}
    />
);

export { CommandEmpty, type CommandEmptyProps };
