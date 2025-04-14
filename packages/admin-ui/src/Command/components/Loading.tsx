import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

type LoadingProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>;

const Loading = (props: LoadingProps) => (
    <CommandPrimitive.Loading
        className="wby-bg-neutral-base wby-text-neutral-strong wby-fill-neutral-xstrong wby-rounded-sm wby-p-sm wby-mx-sm wby-text-md outline-none"
        {...props}
    />
);

export { Loading, type LoadingProps };
