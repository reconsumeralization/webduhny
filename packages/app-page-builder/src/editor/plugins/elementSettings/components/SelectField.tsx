import React from "react";
import omit from "lodash/omit";
import { Select as AdminUiSelect } from "@webiny/admin-ui";

interface SelectProps {
    value?: string;
    onChange?: (value: string) => void;
    // One or more <option> or <optgroup> elements.
    children?: Array<React.ReactElement<"option"> | React.ReactElement<"optgroup">>;
    className?: string;
    [key: string]: any;
}

const SelectField = ({
    value = "",
    onChange,
    validation = { isValid: true },
    description,
    placeholder = "",
    ...props
}: SelectProps) => {

    return <AdminUiSelect
        placeholder={placeholder}
        description={description}
        value={value}
        onChange={({ target: { value } }) => {
            if (!onChange) {
                return;
            }
            onChange(value);
        }}
        {...omit(props, "validate")}
    />
};

export default React.memo(SelectField);
