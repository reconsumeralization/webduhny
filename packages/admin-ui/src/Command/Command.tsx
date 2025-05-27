import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, withStaticProps } from "~/utils";
import { Empty, Group, Input, Item, List, Loading, Separator } from "./components";

type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

const CommandBase = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
    <CommandPrimitive
        className={cn("wby-flex wby-h-full wby-w-full wby-flex-col wby-outline-none", className)}
        {...props}
    />
);

const Command = withStaticProps(CommandBase, {
    Empty,
    Group,
    Input,
    Item,
    List,
    Loading,
    Separator
});

export { Command, type CommandProps };
