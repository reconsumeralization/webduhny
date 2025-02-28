import React, { SyntheticEvent, useCallback, useState } from "react";
import keycode from "keycode";
import minimatch from "minimatch";
import { Input, InputProps } from "~/Input";
import { Chips, Chip } from "~/Chips";
import { FormComponentProps } from "~/types";

interface TagsProps extends FormComponentProps {
    /**
     * Component label.
     */
    label?: string;

    /**
     * Are input and chosen tags disabled?
     */
    disabled?: boolean;

    /**
     * Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label.
     */
    placeholder?: string;

    /**
     * Description beneath the input.
     */
    description?: string;

    /**
     * A className for the root element.
     */
    className?: string;

    /**
     * A list of tags.
     */
    value?: string[];

    /**
     * Callback that gets executed on change of input value.
     */
    onInput?: <T = unknown>(value: T) => void;

    /**
     * Callback that gets executed when the input is focused.
     */
    onFocus?: (ev: Event) => void;

    /**
     * Automatically focus on the tags input.
     */
    autoFocus?: boolean;

    /**
     * Protected tags cannot be removed by the user.
     */
    protectedTags?: string[];
}

export const Tags = (props: TagsProps) => {
    const [inputValue, setInputValue] = useState("");

    const { value, disabled, onChange, protectedTags = [], ...otherInputProps } = props;

    const isProtected = useCallback(
        (tag: string) => protectedTags.some(pattern => minimatch(tag, pattern)),
        [protectedTags]
    );

    const inputProps: InputProps<string> = {
        ...otherInputProps,
        value: inputValue,
        onChange: inputValue => {
            setInputValue(inputValue);
        },
        onKeyDown: (ev: SyntheticEvent) => {
            if (!onChange) {
                return;
            }

            const newValue = Array.isArray(value) ? [...value] : [];

            /**
             * We must cast as keycode only works with Event | string type.
             */
            switch (keycode(ev as unknown as Event)) {
                case "enter":
                    if (inputValue) {
                        newValue.push(inputValue);
                        onChange(newValue);
                        setInputValue("");
                    }
                    break;
                case "backspace":
                    if (newValue.length && !inputValue) {
                        newValue.splice(-1, 1);
                        onChange(newValue);
                        break;
                    }
            }
        }
    };

    return (
        <div>
            <Input {...inputProps} />
            {Array.isArray(value) && value.length ? (
                <Chips disabled={disabled}>
                    {value.map((item, index) => {
                        return (
                            <Chip
                                label={item}
                                key={`${item}-${index}`}
                                onRemove={
                                    !isProtected(item)
                                        ? () => {
                                              // On removal, let's update the value and call "onChange" callback.
                                              if (onChange) {
                                                  const newValue = [...value];
                                                  newValue.splice(index, 1);
                                                  onChange(newValue);
                                              }
                                          }
                                        : undefined
                                }
                            />
                        );
                    })}
                </Chips>
            ) : null}
        </div>
    );
};

export default Tags;
