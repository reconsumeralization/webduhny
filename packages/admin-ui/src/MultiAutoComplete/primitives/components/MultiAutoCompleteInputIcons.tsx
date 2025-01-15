import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";

interface MultiAutoCompleteInputIconsProps {
    displayResetAction: boolean;
    isDisabled?: boolean;
    onOpenChange: (open: boolean) => void;
    onResetValue: () => void;
}

export const MultiAutoCompleteInputIcons = (props: MultiAutoCompleteInputIconsProps) => {
    return (
        <div className={"flex items-center gap-sm"}>
            {props.displayResetAction && (
                <IconButton
                    size={"xs"}
                    variant={"secondary"}
                    icon={<Icon icon={<Close />} label={"Reset"} />}
                    disabled={props.isDisabled}
                    onClick={event => {
                        event.stopPropagation();
                        props.onResetValue();
                    }}
                />
            )}
            <Icon
                size={"sm"}
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
