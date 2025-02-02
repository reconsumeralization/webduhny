import React, { useMemo } from "react";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { Icon as IconComponent } from "~/Icon";
import { inputVariants } from "~/Input";
import type { VariantProps } from "~/utils";
import { IconPickerIcon } from "./IconPickerIcon";
import { Icon, IconFormatter } from "../../domains";

interface IconPickerTriggerProps {
    value?: string;
    size?: VariantProps<typeof inputVariants>["size"];
}

const IconPickerTrigger = ({ value, size }: IconPickerTriggerProps) => {
    const icon = useMemo(() => {
        const icon = Icon.createFromString(value);
        return IconFormatter.formatFontAwesome(icon);
    }, [value]);

    return (
        <div className={"wby-flex wby-items-center wby-gap-xs"}>
            <div>
                <IconComponent
                    size={size === "xl" ? "lg" : "md"}
                    icon={<IconPickerIcon prefix={icon.prefix} name={icon.name} />}
                    label={`Selected icon`}
                />
            </div>
            <div>
                <IconComponent size={"sm"} icon={<ChevronDown />} label={"Open list"} />
            </div>
        </div>
    );
};

export { IconPickerTrigger, type IconPickerTriggerProps };
