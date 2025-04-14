import * as React from "react";
import { ReactComponent as Check } from "@webiny/icons/check.svg";
import { Command as CommandPrimitive } from "cmdk";
import { cn, cva, type VariantProps } from "~/utils";

const commandItemVariants = cva(
    [
        "wby-flex wby-items-center wby-justify-between wby-gap-sm-extra wby-cursor-default wby-select-none wby-rounded-sm wby-p-sm wby-mx-sm wby-text-md wby-outline-none wby-overflow-hidden",
        "wby-bg-neutral-base wby-text-neutral-primary wby-fill-neutral-xstrong",
        "data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:wby-cursor-not-allowed",
        "data-[selected=true]:wby-bg-neutral-dimmed"
    ],
    {
        variants: {
            selected: {
                true: "wby-font-semibold wby-bg-neutral-dimmed"
            }
        }
    }
);

interface ItemProps
    extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
        VariantProps<typeof commandItemVariants> {
    selected?: boolean;
}

const Item = ({ className, children, selected, ...props }: ItemProps) => (
    <CommandPrimitive.Item className={cn(commandItemVariants({ selected }), className)} {...props}>
        <span className={"wby-w-full wby-overflow-hidden wby-truncate wby-whitespace-nowrap"}>
            {children}
        </span>
        {selected ? <Check className="wby-w-md wby-h-md" /> : null}
    </CommandPrimitive.Item>
);

export { Item, type ItemProps };
