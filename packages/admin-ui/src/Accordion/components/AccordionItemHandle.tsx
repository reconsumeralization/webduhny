import * as React from "react";
import { useCallback } from "react";
import { makeDecoratable } from "~/utils";
import { Icon, IconProps as IconProps } from "~/Icon";
import { ReactComponent as DragHandleIcon } from "@material-design-icons/svg/filled/drag_indicator.svg";

interface AccordionItemHandleProps extends Omit<IconProps, "icon" | "label"> {
    icon?: React.ReactElement;
    label?: string;
}

const AccordionItemHandleBase = ({ onClick, ...props }: AccordionItemHandleProps) => {
    // We need to stop the event propagation to prevent the accordion from opening/closing when the handle is clicked.
    const onClickCallback = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    return (
        <Icon
            size={"md"}
            color={"neutral-light"}
            className={"wby-mx-xxs wby-cursor-grab"}
            icon={<DragHandleIcon />}
            label={"Drag handle"}
            {...props}
            onClick={onClickCallback}
        />
    );
};

const AccordionItemHandle = makeDecoratable("AccordionItemHandle", AccordionItemHandleBase);

export { AccordionItemHandle, type AccordionItemHandleProps };
