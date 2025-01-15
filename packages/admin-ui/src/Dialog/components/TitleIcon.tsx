import * as React from "react";
import { cn, makeDecoratable } from "~/utils";
import { Icon, IconProps } from "~/Icon";

type TitleIconProps = IconProps;

const TitleIconBase = ({ className, ...props }: TitleIconProps) => {
    return (
        <Icon size={"lg"} color={"neutral-strong"} {...props} className={cn("pt-xs", className)} />
    );
};

export const TitleIcon = makeDecoratable("TitleIcon", TitleIconBase);
