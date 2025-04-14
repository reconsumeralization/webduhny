import { useMemo } from "react";
import omit from "lodash/omit";
import { ButtonProps as AdminUiButtonProps } from "@webiny/admin-ui";
import { ButtonProps } from "~/Button/Button";

export const useMappedButtonProps = (props: ButtonProps) => {
    return useMemo(() => {
        const mappedButtonProps: Pick<AdminUiButtonProps, "size" | "text"> = {};

        if (props.small === true) {
            mappedButtonProps.size = "sm";
        }

        if (props.children) {
            mappedButtonProps.text = props.children;
        }

        // Return all remaining props omitting unused ones.
        return {
            ...omit(props, ["flat", "ripple", "small"]),
            ...mappedButtonProps
        };
    }, [props]);
};
