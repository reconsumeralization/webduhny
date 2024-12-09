import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { InputPrimitive, InputPrimitiveProps } from "~/Input";

type CommandInputProps = Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "size"
> &
    InputPrimitiveProps & {
        inputElement?: React.ReactNode;
    };

const CommandInput = ({ inputElement, size, ...props }: CommandInputProps) => {
    return (
        <CommandPrimitive.Input asChild {...props}>
            {inputElement ?? <InputPrimitive size={size} />}
        </CommandPrimitive.Input>
    );
};

export { CommandInput, type CommandInputProps };
