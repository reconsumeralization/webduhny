import React from "react";
import { ReactComponent as ArrowDown } from "@webiny/icons/keyboard_arrow_up.svg";
import { Icon } from "~/Icon";
import { cn, cva, type VariantProps } from "~/utils";

const directionVariants = cva("wby-inline", {
    variants: {
        direction: {
            asc: "wby-rotate-0",
            desc: "wby-rotate-180"
        }
    }
});

interface DirectionProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof directionVariants> {}

const Direction = ({ className, direction }: DirectionProps) => {
    if (!direction) {
        return null;
    }

    return (
        <Icon
            className={cn(directionVariants({ direction }), className)}
            size="sm"
            icon={<ArrowDown />}
            label={"Sort column"}
            color={"neutral-strong"}
        />
    );
};

export { Direction, type DirectionProps };
