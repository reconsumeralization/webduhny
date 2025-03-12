import React, { useCallback, useMemo } from "react";
import { ColorPicker as AdminColorPicker } from "@webiny/admin-ui";
import { FormComponentProps } from "~/types";

interface ColorPickerProps extends FormComponentProps<string> {
    // Component label.
    label?: string;

    // Is color picker disabled?
    disable?: boolean;

    // Description beneath the color picker.
    description?: string;

    // Popover alignment (default is `left`).
    align?: "left" | "right";
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `ColorPicker` component from the `@webiny/admin-ui` package instead.
 */
const ColorPicker = ({ value, onChange, align: originalAlign, ...props }: ColorPickerProps) => {
    const onValueChange = useCallback((value: string) => onChange && onChange(value), [onChange]);

    const align = useMemo(() => {
        if (!originalAlign) {
            return undefined;
        }

        if (originalAlign === "right") {
            return "end";
        }

        return "start";
    }, [originalAlign]);

    return (
        <AdminColorPicker {...props} value={value} onValueChange={onValueChange} align={align} />
    );
};

export { ColorPicker };
