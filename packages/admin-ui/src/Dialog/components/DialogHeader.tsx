import * as React from "react";
import { cn } from "~/utils";
import { type DialogProps } from "../Dialog";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { IconButton } from "~/Button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useMemo } from "react";

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
    const nothingToRender = useMemo(() => {
        return !title && !description && !icon && !showCloseButton;
    }, [title, description, icon, showCloseButton]);

    if (nothingToRender) {
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
            <DialogTitle className={"flex justify-between"}>
                <div>
                    {icon}
                    {title}
                </div>

                {showCloseButton !== false && (
                    <DialogPrimitive.Close asChild>
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DialogPrimitive.Close>
                )}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </div>
    );
};
