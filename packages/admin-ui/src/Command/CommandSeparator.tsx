import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Separator } from "~/Separator";

type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>;

const CommandSeparator = (props: CommandSeparatorProps) => (
    <CommandPrimitive.Separator asChild {...props}>
        <Separator variant={"strong"} margin={"md"} />
    </CommandPrimitive.Separator>
);

export { CommandSeparator, type CommandSeparatorProps };
