import * as React from "react";
import { cn } from "~/utils";
import { type DrawerProps } from "../Drawer";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerDescription } from "./DrawerDescription";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { IconButton } from "~/Button";
import * as DrawerPrimitive from "@radix-ui/react-dialog";

export type DrawerHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<DrawerProps, "title" | "titleIcon" | "description" | "showCloseButton">;

export const DrawerHeader = ({
    title,
    titleIcon,
    description,
    showCloseButton,
    className,
    ...props
}: DrawerHeaderProps) => {
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
                    <DrawerPrimitive.Close asChild className="absolute right-0 top-0">
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </DrawerPrimitive.Close>
                )}
                <DrawerTitle>
                    {titleIcon}
                    {title}
                </DrawerTitle>
            </div>
            <DrawerDescription>{description}</DrawerDescription>
        </div>
    );
};
