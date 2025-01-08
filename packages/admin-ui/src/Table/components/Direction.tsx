import React from "react";
import { ReactComponent as ArrowDown } from "@material-design-icons/svg/outlined/keyboard_arrow_up.svg";
import { Icon } from "~/Icon";
import { cn, cva, VariantProps } from "~/utils";

const directionVariants = cva("inline", {
    variants: {
        direction: {
            asc: "rotate-0",
            desc: "rotate-180"
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
