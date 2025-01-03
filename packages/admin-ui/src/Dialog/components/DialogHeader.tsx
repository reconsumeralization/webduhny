import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DialogProps, "title" | "description">;

export const DialogHeader = ({ title, description, className, ...props }: DialogHeaderProps) => {
    let renderedTitle = <DialogTitle>{title}</DialogTitle>;
    if (!title) {
        renderedTitle = <VisuallyHidden.Root>{renderedTitle}</VisuallyHidden.Root>;
    }

    let renderedDescription = <DialogDescription>{description}</DialogDescription>;
    if (!description) {
        renderedDescription = <VisuallyHidden.Root>{renderedDescription}</VisuallyHidden.Root>;
    }

    if (!title && !description) {
        return (
            <>
                {renderedTitle}
                {renderedDescription}
            </>
        );
    }

    return (
        <div
            {...props}
            className={cn(
                "flex flex-col gap-y-xxs mb-lg text-center sm:text-left text-neutral-primary",
                className
            )}
        >
            {renderedTitle}
            {renderedDescription}
        </div>
    );
};
