import * as React from "react";
import { cn } from "~/utils";
import type { DrawerProps } from "~/Drawer";

export type DrawerBodyProps = Pick<DrawerProps, "children" | "bodyPadding">;

export const DrawerBody = ({ bodyPadding, children }: DrawerBodyProps) => {
    return (
        <div className={cn("h-full py-sm overflow-auto", { "px-lg": bodyPadding !== false })}>
            {children}
        </div>
    );
};
