import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn, cva, makeDecoratable, VariantProps } from "~/utils";
import { useSwitch } from "~/Switch/useSwitch";
import { SwitchItemFormatted } from "~/Switch/SwitchItemFormatted";
import { CheckboxItemDto } from "~/Checkbox/CheckboxItemDto";

/**
 * Switch Renderer
 */

const switchVariants = cva("flex items-center space-x-2", {
    variants: {
        labelPosition: {
            start: "",
            end: "flex-row-reverse space-x-reverse "
        }
    },
    defaultVariants: {
        labelPosition: "start"
    }
});

type SwitchProps = Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    "defaultChecked" | "onCheckedChange"
> &
    VariantProps<typeof switchVariants> &
    CheckboxItemDto & {
        onCheckedChange: (checked: boolean) => void;
    };

type SwitchVm = {
    item?: SwitchItemFormatted;
};

type SwitchRendererProps = Omit<SwitchProps, "onCheckedChange"> &
    NonNullable<SwitchVm["item"]> & {
        changeChecked: (checked: boolean) => void;
    };

const DecoratableSwitchRenderer = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchRendererProps
>(({ id, label, changeChecked, className, labelPosition, ...props }, ref) => {
    return (
        <div className={cn(switchVariants({ labelPosition, className }))}>
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
            <SwitchPrimitives.Root
                ref={ref}
                {...props}
                id={id}
                className={cn([
                    "peer inline-flex h-4 w-[26px] shrink-0 cursor-pointer items-center rounded-xxl border-sm transition-colors",
                    "border-transparent data-[state=checked]:bg-secondary-default data-[state=unchecked]:bg-neutral-strong",
                    "focus-visible:outline-none focus-visible:border-success-default focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                    "disabled:cursor-not-allowed disabled:bg-neutral-muted disabled:data-[state=checked]:bg-neutral-muted"
                ])}
                onCheckedChange={changeChecked}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "pointer-events-none block h-2.5 w-2.5 rounded-xxl bg-neutral-base shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5"
                    )}
                />
            </SwitchPrimitives.Root>
        </div>
    );
});
DecoratableSwitchRenderer.displayName = "SwitchRenderer";

const SwitchRenderer = makeDecoratable("SwitchRenderer", DecoratableSwitchRenderer);

/**
 * Switch
 */
const DecoratableSwitch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>((props, ref) => {
    const { vm, changeChecked } = useSwitch(props);
    if (!vm.item) {
        return null;
    }

    return <SwitchRenderer {...props} {...vm.item} changeChecked={changeChecked} ref={ref} />;
});
DecoratableSwitch.displayName = SwitchPrimitives.Root.displayName;
const Switch = makeDecoratable("Switch", DecoratableSwitch);

export { Switch, type SwitchProps, type SwitchVm };
