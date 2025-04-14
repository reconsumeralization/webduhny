import * as React from "react";
import { makeDecoratable } from "~/utils";
import { Icon as IconComponent, IconProps as IconComponentProps } from "~/Icon";

type AccordionItemIconProps = IconComponentProps;

const AccordionItemIconBase = (props: AccordionItemIconProps) => {
    return <IconComponent size={"md"} color={"neutral-strong"} {...props} />;
};

export const AccordionItemIcon = makeDecoratable("AccordionItemIcon", AccordionItemIconBase);
