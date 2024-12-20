import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";

interface MultiAutoCompleteInputIconsProps {
    hasValue: boolean;
    onOpenChange: (open: boolean) => void;
    onResetValue: () => void;
}

export const MultiAutoCompleteInputIcons = (props: MultiAutoCompleteInputIconsProps) => {
    return (
        <div className={"flex items-center gap-sm"}>
            {props.hasValue && (
                <IconButton
                    size={"xs"}
                    variant={"secondary"}
                    icon={<Icon icon={<Close />} label={"Reset"} />}
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
