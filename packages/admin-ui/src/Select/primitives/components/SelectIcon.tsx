import * as React from "react";
import * as SelectPrimitives from "@radix-ui/react-select";

type SelectIconProps = {
    icon: React.ReactElement;
};

const SelectIcon = ({ icon }: SelectIconProps) => {
    return (
        <SelectPrimitives.Icon asChild className={"wby-h-md wby-w-md"}>
            {React.cloneElement(icon)}
        </SelectPrimitives.Icon>
    );
};

export { SelectIcon, type SelectIconProps };
