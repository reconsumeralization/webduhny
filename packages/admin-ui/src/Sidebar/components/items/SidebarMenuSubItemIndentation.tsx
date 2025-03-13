import React from "react";
import { Separator } from "~/Separator";

import { cva, type VariantProps } from "~/utils";

const separatorVariants = cva(["wby-h-xl wby-ml-px"], {
    variants: {
        variant: {
            "group-label": "!wby-h-[38px]"
        }
    }
});

export interface SidebarMenuSubItemIndentationProps
    extends Omit<React.HTMLAttributes<HTMLLIElement>, "content">,
        VariantProps<typeof separatorVariants> {
    lvl: number;
}

const SidebarMenuSubItemIndentation = ({ lvl, variant }: SidebarMenuSubItemIndentationProps) => {
    return (
        <div data-sidebar="indentation" className={"wby-gap-x-xs wby-flex wby-mr-sm"}>
            {Array.from({ length: lvl }, (_, index) => (
                <div data-sidebar={"indentation-element"} className={"wby-ml-md"} key={lvl + index}>
                    <Separator
                        orientation={"vertical"}
                        margin={"none"}
                        variant={"strong"}
                        className={separatorVariants({ variant })}
                    />
                </div>
            ))}
        </div>
    );
};

export { SidebarMenuSubItemIndentation };
