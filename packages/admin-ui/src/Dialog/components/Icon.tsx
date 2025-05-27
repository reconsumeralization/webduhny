import * as React from "react";
import { cn, makeDecoratable } from "~/utils";
import { Icon as IconComponent, IconProps as IconComponentProps } from "~/Icon";

type IconProps = IconComponentProps;

const IconBase = ({ className, ...props }: IconProps) => {
    return (
        <IconComponent
            size={"lg"}
            color={"neutral-strong"}
            {...props}
            className={cn("wby-pt-xs", className)}
        />
    );
};

export const Icon = makeDecoratable("Icon", IconBase);
