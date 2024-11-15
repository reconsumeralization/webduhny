import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";

/**
 * Radio Group
 */
const DecoratableRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
    );
});
DecoratableRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroup = makeDecoratable("RadioGroup", DecoratableRadioGroup);

/**
 * Radio
 */
const DecoratableRadio = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
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
        </RadioGroupPrimitive.Item>
    );
});
DecoratableRadio.displayName = RadioGroupPrimitive.Item.displayName;
const Radio = makeDecoratable("Radio", DecoratableRadio);

export { RadioGroup, Radio };
