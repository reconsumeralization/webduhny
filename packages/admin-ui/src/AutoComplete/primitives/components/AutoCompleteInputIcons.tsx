import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";
import { Loader } from "~/Loader";

interface AutoCompleteInputIconsProps {
    displayResetAction: boolean;
    inputSize?: "md" | "lg" | "xl" | null;
    loading?: boolean;
    disabled?: boolean;
    onOpenChange: (open: boolean) => void;
    onResetValue: () => void;
}

export const AutoCompleteInputIcons = (props: AutoCompleteInputIconsProps) => {
    return (
        <div className={"wby-flex wby-items-center wby-gap-sm"}>
            {props.loading && <Loader size={props.inputSize === "xl" ? "sm" : "xs"} />}
            {props.displayResetAction && (
                <IconButton
                    size={props.inputSize === "xl" ? "sm" : "xs"} // Map button size based on the input size.
                    variant={"secondary"}
                    icon={<Icon icon={<Close />} label={"Reset"} />}
                    disabled={props.disabled}
                    onClick={event => {
                        event.stopPropagation();
                        props.onResetValue();
                    }}
                />
            )}
            <Icon
                size={props.inputSize === "xl" ? "lg" : "sm"} // Map icon size based on the input size.
                icon={<ChevronDown />}
                label={"Open list"}
                onClick={event => {
                    event.stopPropagation();
                    props.onOpenChange(true);
                }}
            />
        </div>
    );
};
