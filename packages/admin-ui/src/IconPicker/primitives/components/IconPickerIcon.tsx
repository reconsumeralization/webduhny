import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

interface IconPickerIconProps extends React.HTMLAttributes<HTMLDivElement> {
    name: IconName;
    prefix: IconPrefix;
}

const IconPickerIcon = ({ name, prefix, ...props }: IconPickerIconProps) => {
    return (
        <div {...props}>
            <FontAwesomeIcon
                icon={[prefix, name]}
                size={"2x"}
                className={"wby-block wby-size-full"}
            />
        </div>
    );
};

export { IconPickerIcon, type IconPickerIconProps };
