import React, { useCallback } from "react";
import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import { Input } from "~/Input";
import { Icon } from "~/Icon";
import { DelayedOnChange, OnChangeCallable } from "~/DelayedOnChange";
import { cn } from "~/utils";

interface IconPickerInputProps {
    value: string;
    onChange: (value: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const IconPickerInput = (props: IconPickerInputProps) => {
    const onInputChange = useCallback<OnChangeCallable>(
        (value, cb) => {
            props.onChange(value);
            if (cb) {
                cb(value);
            }
        },
        [props.onChange]
    );

    return (
        <DelayedOnChange value={props.value} onChange={onInputChange}>
            {({ value, onChange }) => (
                <div className={cn("wby-p-xs-plus wby-pb-0")}>
                    <Input
                        inputRef={props.inputRef}
                        value={value}
                        onChange={onChange}
                        placeholder={"Search icons..."}
                        variant={"secondary"}
                        size={"md"}
                        startIcon={<Icon icon={<SearchIcon />} label={"Search icons"} />}
                    />
                </div>
            )}
        </DelayedOnChange>
    );
};

export { IconPickerInput, type IconPickerInputProps };
