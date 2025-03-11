import * as React from "react";
import { ReactComponent as ImageIcon } from "@material-design-icons/svg/outlined/image.svg";
import { Button } from "~/Button";
import { cn, cva, type VariantProps } from "~/utils";

const filePlaceholderVariants = cva("wby-flex", {
    variants: {
        type: {
            compact: "wby-w-full",
            area: ["wby-justify-center", "wby-px-xl wby-py-md-extra"]
        }
    },
    defaultVariants: {
        type: "compact"
    }
});

interface FilePlaceholderProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof filePlaceholderVariants> {
    disabled?: boolean;
    text?: string;
}

const FilePlaceholder = ({
    text = "Select from library",
    type,
    disabled,
    className,
    ...props
}: FilePlaceholderProps) => {
    return (
        <div
            data-role={"select-image"}
            className={cn(filePlaceholderVariants({ type }), className)}
            {...props}
        >
            <Button
                className={cn(type !== "area" ? "wby-w-full" : "")}
                text={text}
                icon={<ImageIcon />}
                variant={"ghost"}
                size={"sm"}
                disabled={disabled}
            />
        </div>
    );
};

export { FilePlaceholder, type FilePlaceholderProps, filePlaceholderVariants };
