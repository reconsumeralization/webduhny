import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { IconButton } from "~/Button";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DialogProps, "title" | "icon" | "description" | "showCloseButton">;

export const DialogHeader = ({
    title,
    icon,
    description,
    showCloseButton,
    className,
    ...props
}: DialogHeaderProps) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div
            {...props}
            className={cn(
                "flex flex-col gap-sm px-lg py-md text-center sm:text-left text-neutral-primary",
                className
            )}
        >
            <div className={"relative"}>
                {showCloseButton !== false && (
                    <DialogPrimitive.Close asChild className="absolute right-0 top-0">
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DialogPrimitive.Close>
                )}
                <DialogTitle>
                    {icon}
                    {title}
                </DialogTitle>
            </div>
            <DialogDescription>{description}</DialogDescription>
        </div>
    );
};
