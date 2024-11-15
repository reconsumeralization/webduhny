import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";
import { RadioItemDto } from "~/Radio/RadioItemDto";
import { RadioItemFormatted } from "~/Radio/RadioItemFormatted";
import { useRadioGroup } from "~/Radio/useRadioGroup";

/**
 * RadioItem
 */
type RadioItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
};

const DecoratableRadioItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioItemProps
>(({ className, label, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                [
                    "group aspect-square h-4 w-4 rounded-xl",
                    "bg-neutral-base border-sm border-neutral-muted ring-offset-background",
                    "focus:outline-none  focus-visible:border-accent-default focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:ring-offset-0",
                    "disabled:cursor-not-allowed disabled:border-neutral-muted disabled:bg-neutral-disabled"
                ],
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <span
                    className={
                        "h-2 w-2 rounded-xl bg-primary-default group-disabled:bg-neutral-strong"
                    }
                />
            </RadioGroupPrimitive.Indicator>
            <span>{label}</span>
        </RadioGroupPrimitive.Item>
    );
});
DecoratableRadioItem.displayName = RadioGroupPrimitive.Item.displayName;
const RadioItem = makeDecoratable("RadioItem", DecoratableRadioItem);

/**
 * Radio Group
 */

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    items?: RadioItemDto[];
};

type RadioGroupVm = RadioGroupPrimitive.RadioGroupProps & {
    items: RadioItemFormatted[];
};

interface RadioGroupRendererProps {
    vm: RadioGroupVm;
    changeValue: (value: string) => void;
}

const DecoratableRadioGroupRenderer = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupRendererProps
>(({ vm, changeValue }, ref) => {
    const { className, items, ...props } = vm;

    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            {...props}
            ref={ref}
            onValueChange={changeValue}
        >
            {items.map(item => (
                <RadioItem
                    id={item.id}
                    value={item.value}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled}
                />
            ))}
        </RadioGroupPrimitive.Root>
    );
});
DecoratableRadioGroupRenderer.displayName = "DecoratableRadioGroupRenderer";
const RadioGroupRenderer = makeDecoratable("RadioGroupRenderer", DecoratableRadioGroupRenderer);

const DecoratableRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps
>((props, ref) => {
    const { vm, changeValue } = useRadioGroup(props);
    return <RadioGroupRenderer vm={vm} changeValue={changeValue} ref={ref} />;
});
DecoratableRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export { RadioGroup, RadioItem, type RadioGroupProps, type RadioGroupVm };
