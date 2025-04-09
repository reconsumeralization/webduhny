import * as React from "react";
import { Droppable, OnDropCallable } from "./../Droppable";
import { cn, cva } from "@webiny/admin-ui";

const droppableContainerVariants = cva(
    "wby-bg-transparent wby-box-border wby-h-full wby-min-h-[120px] wby-relative wby-user-select-none wby-w-full wby-border-md wby-border-dashed",
    {
        variants: {
            isOver: {
                true: "wby-border-accent-default wby-text-accent-primary",
                false: "wby-border-success-default wby-text-success-primary"
            }
        },
        defaultVariants: {
            isOver: false
        }
    }
);

export interface CenterProps {
    type?: string;
    onDrop: OnDropCallable;
    children: React.ReactNode;
    active?: boolean;
    highlight?: boolean;
}

export const Center = ({ onDrop, children }: CenterProps) => {
    return (
        <Droppable onDrop={onDrop}>
            {({ isOver, drop }) => (
                <div
                    ref={drop}
                    style={{ width: "100%", height: "100%" }}
                    data-testid={"fb.editor.dropzone.center"}
                >
                    <div className={cn(droppableContainerVariants({ isOver }))}>
                        <div className="wby-absolute wby-top-1/2 wby-left-1/2 wby-transform wby--translate-x-1/2 wby--translate-y-1/2 wby-m-0">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    );
};
