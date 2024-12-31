import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DialogProps, "title" | "description">;

export const DialogHeader = ({ title, description, className, ...props }: DialogHeaderProps) => {
    if (!title) {
        return null;
    }

    const renderedTitle = <DialogTitle>{title}</DialogTitle>;

    // If there is no description, use the title as the description, but visually hide it.
    // We're doing this because, without a description, warnings are thrown in the console.
    let renderedDescription = <DialogDescription>{description}</DialogDescription>;
    if (!description) {
        renderedDescription = (
            <VisuallyHidden.Root>
                <DialogDescription>{title}</DialogDescription>
            </VisuallyHidden.Root>
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
