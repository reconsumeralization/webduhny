import React, { useCallback, useMemo, ReactElement } from "react";
import pick from "lodash/pick";
import { FormComponentProps } from "~/types";
import classNames from "classnames";
import { Input as AdminInput } from "@webiny/admin-ui";

export interface TextFieldHelperTextProps {
    /** Make the help text always visible */
    persistent?: boolean;
    /** Make the help a validation message style */
    validationMsg?: boolean;
    /** Content for the help text */
    children: React.ReactNode;
}

export interface TextFieldProps {
    /** Sets the value for controlled TextFields. */
    value?: string | number;
    /** Adds help text to the field */
    helpText?: React.ReactNode | TextFieldHelperTextProps;
    /** Shows the character count, must be used in conjunction with maxLength. */
    characterCount?: boolean;
    /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used.  */
    invalid?: boolean;
    /** Makes the Textfield disabled. */
    disabled?: boolean;
    /** Makes the Textfield required. */
    required?: boolean;
    /** Outline the TextField. */
    outlined?: boolean;
    /** How to align the text inside the TextField. Defaults to 'start'. */
    align?: "start" | "end";
    /** A label for the input. */
    label?: React.ReactNode;
    /** The label floats automatically based on value, but you can use this prop for manual control. */
    floatLabel?: boolean;
    /** Makes a multiline TextField. */
    textarea?: boolean;
    /** Makes the TextField fullwidth. */
    fullwidth?: boolean;
    /** Add a leading icon. */
    icon?: React.ReactNode;
    /** Add a trailing icon. */
    trailingIcon?: React.ReactNode;
    /** By default, props spread to the input. These props are for the component's root container. */
    // rootProps?: Object;
    /** A reference to the native input or textarea. */
    inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement | null>;
    /** The type of input field to render, search, number, etc */
    type?: string;
    /** Add prefix. */
    prefix?: string;
    /** Add suffix. */
    suffix?: string;
    /** Advanced: A reference to the MDCFoundation. */
    // foundationRef?: React.Ref<MDCTextFieldFoundation | null>;
    /** Make textarea resizeable */
    resizeable?: boolean;
}

export type InputProps<TValue = any> = FormComponentProps<TValue> &
    TextFieldProps & {
        // Should this input be filled with browser values
        autoComplete?: string;

        // If true, will pass native `event` to the `onChange` callback
        rawOnChange?: boolean;

        // Auto-focus input
        autoFocus?: boolean;

        // Input placeholder
        placeholder?: string;

        // Description beneath the input.
        description?: string | ReactElement;

        // Converts input into a text area with given number of rows.
        rows?: number;

        maxLength?: number;

        // A callback that is executed when input focus is lost.
        onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => any;

        onKeyDown?: (e: React.SyntheticEvent<HTMLInputElement>) => any;

        // A callback that gets triggered when the user presses the "Enter" key.
        onEnter?: () => any;

        // CSS class name
        className?: string;

        // For testing purposes.
        "data-testid"?: string;

        // Size - small, medium or large
        size?: "small" | "medium" | "large";

        children?: React.ReactNode;
    };

export type InputOnKeyDownProps = React.SyntheticEvent<HTMLInputElement> & {
    key?: string;
};
/**
 * Use Input component to store short string values, like first name, last name, e-mail etc.
 * Additionally, with rows prop, it can also be turned into a text area, to store longer strings.
 */

// IconProps directly passed to RMWC
const rmwcProps = [
    "label",
    "type",
    "step",
    "disabled",
    "readOnly",
    "placeholder",
    "outlined",
    "onKeyDown",
    "onKeyPress",
    "onKeyUp",
    "onFocus",
    "rootProps",
    "fullwidth",
    "inputRef",
    "className",
    "maxLength",
    "characterCount"
];

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Input` component from the `@webiny/admin-ui` package instead.
 */
export const Input = (props: InputProps) => {
    const onChange = useCallback(
        (e: React.SyntheticEvent<HTMLInputElement>) => {
            const { onChange, rawOnChange } = props;
            if (!onChange) {
                return;
            }

            // @ts-expect-error
            onChange(rawOnChange ? e : e.target.value);
        },
        [props.onChange]
    );

    const onBlur = useCallback(
        async (e: React.SyntheticEvent<HTMLInputElement>) => {
            const { validate, onBlur } = props;
            if (validate) {
                // Since we are accessing event in an async operation, we need to persist it.
                // See https://reactjs.org/docs/events.html#event-pooling.
                e.persist();
                await validate();
            }
            onBlur && onBlur(e);
        },
        [props.validate, props.onBlur]
    );

    const {
        autoFocus,
        value,
        label,
        description,
        placeholder,
        // rows,
        validation,
        // icon,
        // trailingIcon,
        onEnter,
        required,
        ...rest
    } = props;

    let inputValue = value;
    if (value === null || typeof value === "undefined") {
        inputValue = "";
    }

    const inputOnKeyDown = useCallback(
        (e: InputOnKeyDownProps) => {
            if (typeof onEnter === "function" && e.key === "Enter") {
                onEnter();
            }

            if (typeof rest.onKeyDown === "function") {
                return rest.onKeyDown(e);
            }
        },
        [rest.onKeyDown, onEnter]
    );

    const size = useMemo(() => {
        if (props.size === "medium") {
            return "md";
        }

        if (props.size === "large") {
            return "lg";
        }

        return "lg";
    }, [props.size]);

    // if (Boolean(rows)) {
    //     return (
    //         <AdminTextarea
    //             {...pick(rest, rmwcProps)}
    //             onKeyDown={inputOnKeyDown}
    //             autoFocus={autoFocus}
    //             value={inputValue}
    //             onChange={onChange}
    //             onBlur={onBlur}
    //             label={label}
    //             // startIcon={icon}
    //             placeholder={placeholder}
    //             //trailingIcon={trailingIcon}
    //             size={size}
    //             className={classNames("webiny-ui-input")}
    //             data-testid={props["data-testid"]}
    //             validation={validation}
    //             note={description}
    //             required={required}
    //             rows={rows}
    //         />
    //     );
    // }

    return (
        <AdminInput
            {...pick(rest, rmwcProps)}
            onKeyDown={inputOnKeyDown}
            autoFocus={autoFocus}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            // startIcon={icon}
            placeholder={placeholder}
            // trailingIcon={trailingIcon}
            size={size}
            className={classNames("webiny-ui-input")}
            data-testid={props["data-testid"]}
            validation={validation}
            note={description}
            required={required}
        />
    );
};
