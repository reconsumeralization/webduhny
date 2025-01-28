import * as React from "react";
import { cn } from "~/utils";
import type { DrawerProps } from "~/Drawer";

export type DrawerBodyProps = Pick<DrawerProps, "children" | "bodyPadding">;

export const DrawerBody = ({ bodyPadding, children }: DrawerBodyProps) => {
    return (
        <div
            className={cn("wby-h-full wby-py-sm wby-overflow-auto", {
                "wby-px-lg": bodyPadding !== false
            })}
        >
            {children}
        </div>
    );
};
