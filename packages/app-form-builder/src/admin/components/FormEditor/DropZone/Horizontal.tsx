import React from "react";
import { Droppable, IsVisibleCallable, OnDropCallable } from "../Droppable";
import { cn } from "@webiny/admin-ui";

interface OuterDivProps {
    isOver: boolean;
    isDragging: boolean;
    last: boolean;
}

const OuterDiv = ({ isOver, isDragging, last }: OuterDivProps) => (
    <div
        className={cn(
            "wby-absolute wby-w-full wby-z-10 wby-bg-transparent wby-flex wby-justify-center",
            last ? "-wby-bottom-md" : "-wby-top-md"
        )}
    >
        <div
            className={cn(
                "wby-h-md wby-w-full wby-z-3 wby-border-dashed wby-border-sm wby-hidden",
                isOver ? "wby-border-accent-default" : "wby-border-success-default",
                isDragging && "wby-block"
            )}
        >
            <div
                className={cn(
                    "wby-w-full wby-h-full wby-opacity-50",
                    isOver ? "wby-bg-primary-muted" : "wby-bg-success-muted"
                )}
            />
        </div>
    </div>
);

export interface HorizontalProps {
    onDrop: OnDropCallable;
    last?: boolean;
    isVisible?: IsVisibleCallable;
}

export const Horizontal = ({ last, onDrop, isVisible }: HorizontalProps) => {
    return (
        <Droppable onDrop={onDrop} isVisible={isVisible}>
            {({ isOver, isDragging, drop }) => (
                <div
                    ref={drop}
                    style={{
                        height: "16px",
                        width: "100%",
                        position: "absolute",
                        [last ? "bottom" : "top"]: 0,
                        left: 0,
                        zIndex: isDragging ? 1000 : -1
                    }}
                    data-testid={last ? "fb.editor.dropzone.horizontal-last" : ""}
                >
                    <OuterDiv isOver={isOver} isDragging={isDragging} last={!!last} />
                </div>
            )}
        </Droppable>
    );
};
