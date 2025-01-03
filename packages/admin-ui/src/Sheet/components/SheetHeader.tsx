import * as React from "react";
import { cn } from "~/utils";
import { type SheetProps } from "../Sheet";
import { SheetTitle } from "./SheetTitle";
import { SheetDescription } from "./SheetDescription";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type SheetHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<SheetProps, "title" | "description">;

export const SheetHeader = ({ title, description, className, ...props }: SheetHeaderProps) => {
    let renderedTitle = <SheetTitle>{title}</SheetTitle>;
    if (!title) {
        renderedTitle = <VisuallyHidden.Root>{renderedTitle}</VisuallyHidden.Root>;
    }

    // If there is no description, use the title as the description, but visually hide it.
    // We're doing this because, without a description, warnings are thrown in the console.
    let renderedDescription = <SheetDescription>{description}</SheetDescription>;
    if (!description) {
        renderedDescription = (
            <VisuallyHidden.Root>
                <SheetDescription>{title}</SheetDescription>
            </VisuallyHidden.Root>
        );
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
                "flex flex-col gap-y-xs mb-lg text-center sm:text-left text-neutral-primary",
                className
            )}
        >
            {renderedTitle}
            {renderedDescription}
        </div>
    );
};
