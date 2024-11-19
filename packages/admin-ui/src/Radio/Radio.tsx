import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";
import { RadioItemDto } from "./RadioItemDto";
import { RadioItemFormatted } from "./RadioItemFormatted";
import { useRadioGroup } from "./useRadioGroup";

/**
 * RadioItem
 */
type RadioItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string | React.ReactNode;
};

const DecoratableRadioItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioItemProps
>(({ className, label, id, ...props }, ref) => {
    return (
        <div className="flex items-start space-x-sm-extra">
            <RadioGroupPrimitive.Item
                ref={ref}
                id={id}
                className={cn(
                    [
                        "group peer aspect-square h-4 w-4 rounded-xl mt-xxs",
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
                        className={cn([
                            "h-2 w-2 rounded-xl",
                            "bg-primary-default",
                            "group-disabled:bg-neutral-strong"
                        ])}
                    />
                </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label
                htmlFor={id}
                className={cn([
                    "text-md",
                    "text-neutral-primary",
                    "peer-disabled:cursor-not-allowed peer-disabled:text-neutral-disabled"
                ])}
            >
                {label}
            </label>
        </div>
    );
});
DecoratableRadioItem.displayName = RadioGroupPrimitive.Item.displayName;
const RadioItem = makeDecoratable("RadioItem", DecoratableRadioItem);

/**
 * Radio Group Root
 */
const DecoratableRadioGroupRoot = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root className={cn("grid gap-md", className)} {...props} ref={ref} />
    );
});
DecoratableRadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupRoot = makeDecoratable("RadioGroupRoot", DecoratableRadioGroupRoot);

/**
 * Radio Group Renderer
 */
type RadioGroupProps = Omit<
    RadioGroupPrimitive.RadioGroupProps,
    "defaultValue" | "onValueChange"
> & {
    items?: RadioItemDto[];
    onValueChange: (value: string) => void;
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
    const { items, ...props } = vm;

    return (
        <RadioGroupRoot {...props} ref={ref} onValueChange={value => changeValue(value)}>
            {items.map(item => (
                <RadioItem
                    id={item.id}
                    value={item.value}
                    key={item.id}
                    label={item.label}
                    disabled={item.disabled}
                />
            ))}
        </RadioGroupRoot>
    );
});
DecoratableRadioGroupRenderer.displayName = "DecoratableRadioGroupRenderer";
const RadioGroupRenderer = makeDecoratable("RadioGroupRenderer", DecoratableRadioGroupRenderer);

/**
 * Radio Group
 */
const DecoratableRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps
>((props, ref) => {
    const { vm, changeValue } = useRadioGroup(props);
    return <RadioGroupRenderer vm={vm} changeValue={changeValue} ref={ref} />;
});
DecoratableRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

export {
    RadioGroup,
    RadioGroupRoot,
    RadioItem,
    type RadioGroupProps,
    type RadioGroupVm,
    type RadioItemProps
};
