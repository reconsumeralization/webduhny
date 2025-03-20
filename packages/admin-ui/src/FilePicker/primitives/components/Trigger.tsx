import * as React from "react";
import { ReactComponent as ImageIcon } from "@material-design-icons/svg/outlined/image.svg";
import { Button } from "~/Button";
import { cn, cva, type VariantProps } from "~/utils";

const triggerVariants = cva(["wby-flex", "data-[disabled=true]:wby-cursor-not-allowed"], {
    variants: {
        type: {
            area: ["wby-justify-center", "wby-px-xl wby-py-md-extra"],
            compact: "wby-w-full [&>span]:!wby-flex-1 [&_button]:!wby-w-full"
        },
        variant: {
            primary: "",
            secondary: "",
            ghost: ""
        }
    },
    compoundVariants: [
        // Combination of `type = area` and different `variant`
        {
            type: "area",
            variant: "primary",
            className: [
                "wby-bg-neutral-subtle",
                "hover:wby-bg-neutral-light",
                "data-[disabled=true]:wby-bg-neutral-disabled"
            ]
        },
        {
            type: "area",
            variant: "secondary",
            className: [
                "wby-bg-neutral-base",
                "hover:wby-bg-neutral-base",
                "data-[disabled=true]:wby-bg-neutral-disabled"
            ]
        },
        {
            type: "area",
            variant: "ghost",
            className: [
                "wby-bg-neutral-subtle",
                "hover:wby-bg-neutral-light",
                "data-[disabled=true]:wby-bg-neutral-base"
            ]
        }
    ],
    defaultVariants: {
        type: "area",
        variant: "primary"
    }
});

interface TriggerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
        VariantProps<typeof triggerVariants> {
    disabled?: boolean;
    text?: string;
    onSelectItem: () => void;
    renderTrigger?: (props: any) => React.ReactElement<any>;
}

const Trigger = ({
    renderTrigger,
    type,
    variant,
    text,
    className,
    disabled,
    onSelectItem,
    ...props
}: TriggerProps) => {
    if (typeof renderTrigger === "function") {
        return renderTrigger({ disabled, text, onSelectItem, ...props });
    }

    return (
        <div
            data-role={"select-image"}
            data-disabled={disabled}
            className={cn(triggerVariants({ type, variant }), className)}
            {...props}
        >
            <Button
                disabled={disabled}
                icon={<ImageIcon />}
                onClick={onSelectItem}
                size={"sm"}
                text={text ?? "Select from library"}
                variant={"ghost"}
            />
        </div>
    );
};

export { Trigger, type TriggerProps, triggerVariants };
