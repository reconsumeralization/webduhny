import * as React from "react";
import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import { cn } from "~/utils";
import { Radio } from "./Radio";
import { RadioItemParams, RadioItemFormatted } from "./domains";
import { useRadioGroup } from "./useRadioGroup";

/**
 * Radio Group Root
 */
const RadioGroupRoot = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>) => {
    return (
        <RadioGroupPrimitives.Root
            className={cn("wby-grid wby-gap-sm-extra", className)}
            {...props}
        />
    );
};

/**
 * Radio Group Renderer
 */
interface RadioGroupPrimitiveProps
    extends Omit<RadioGroupPrimitives.RadioGroupProps, "defaultValue" | "onValueChange"> {
    items: RadioItemParams[];
    onValueChange: (value: string) => void;
}

interface RadioGroupVm {
    items: RadioItemFormatted[];
}

interface RadioGroupRendererProps extends Omit<RadioGroupPrimitiveProps, "onValueChange"> {
    items: RadioItemFormatted[];
    changeValue: (value: string) => void;
}

const RadioGroupRenderer = ({ items, changeValue, ...props }: RadioGroupRendererProps) => {
    return (
        <RadioGroupRoot {...props} onValueChange={value => changeValue(value)}>
            {items.map(item => (
                <Radio
                    id={item.id}
                    value={item.value}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled}
                />
            ))}
        </RadioGroupRoot>
    );
};

/**
 * Radio Group Primitive
 */
const RadioGroupPrimitive = (props: RadioGroupPrimitiveProps) => {
    const { vm, changeValue } = useRadioGroup(props);
    return <RadioGroupRenderer {...props} items={vm.items} changeValue={changeValue} />;
};

/**
 * @deprecated
 * This component is retained in @webiny/admin-ui and used in  @webiny/ui solely as a compatibility layer.
 * It is marked as deprecated because nesting `Radio` components inside `RadioGroup` is no longer the recommended approach.
 * Instead, we now pass an array of `RadioItemDto` directly to `RadioGroup` for better maintainability.
 */
const DeprecatedRadioGroup = RadioGroupRoot;

export {
    RadioGroupPrimitive,
    RadioGroupRenderer,
    DeprecatedRadioGroup,
    type RadioGroupPrimitiveProps,
    type RadioGroupVm
};
