import React from "react";
import omit from "lodash/omit";
import { Select } from "@webiny/admin-ui";

type SelectProps = React.ComponentProps<typeof Select>;

const SelectField = ({
    value = "",
    onChange,
    validation = { isValid: true },
    description,
    placeholder = "",
    ...props
}: SelectProps) => {
    return (
        <Select
            placeholder={placeholder}
            description={description}
            value={value}
            onChange={value => {
                if (!onChange) {
                    return;
                }
                onChange(value);
            }}
            {...omit(props, "validate")}
        />
    );
};

export default React.memo(SelectField);
