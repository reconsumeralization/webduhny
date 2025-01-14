import * as React from "react";
import { cn } from "~/utils";
import { type DrawerProps } from "../Drawer";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerDescription } from "./DrawerDescription";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type DrawerHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DrawerProps, "title" | "description">;

export const DrawerHeader = ({ title, description, className, ...props }: DrawerHeaderProps) => {
    let renderedTitle = <DrawerTitle>{title}</DrawerTitle>;
    if (!title) {
        renderedTitle = <VisuallyHidden.Root>{renderedTitle}</VisuallyHidden.Root>;
    }

    // If there is no description, use the title as the description, but visually hide it.
    // We're doing this because, without a description, warnings are thrown in the console.
    let renderedDescription = <DrawerDescription>{description}</DrawerDescription>;
    if (!description) {
        renderedDescription = (
            <VisuallyHidden.Root>
                <DrawerDescription>{title}</DrawerDescription>
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
