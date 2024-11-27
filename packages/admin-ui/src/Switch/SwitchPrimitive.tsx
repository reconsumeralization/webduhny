import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn, cva, makeDecoratable, VariantProps } from "~/utils";
import { useSwitch } from "~/Switch/useSwitch";
import { SwitchItemFormatted } from "~/Switch/SwitchItemFormatted";
import { CheckboxItemDto } from "~/Checkbox/CheckboxItemDto";

/**
 * Switch Renderer
 */

const switchVariants = cva("flex items-start space-x-sm-extra", {
    variants: {
        labelPosition: {
            start: "",
            end: "flex-row-reverse space-x-reverse"
        }
    },
    defaultVariants: {
        labelPosition: "start"
    }
});

type SwitchPrimitiveProps = Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    "defaultChecked" | "onCheckedChange"
> &
    VariantProps<typeof switchVariants> &
    CheckboxItemDto & {
        onCheckedChange: (checked: boolean) => void;
    };

type SwitchPrimitivVm = {
    item?: SwitchItemFormatted;
};

type SwitchRendererProps = Omit<SwitchPrimitiveProps, "onCheckedChange"> &
    NonNullable<SwitchPrimitivVm["item"]> & {
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
                    "peer inline-flex h-md w-[26px] mt-xxs shrink-0 cursor-pointer items-center rounded-xxl border-sm transition-colors",
                    "border-transparent data-[state=checked]:bg-secondary-default data-[state=unchecked]:bg-neutral-strong",
                    "focus-visible:outline-none focus-visible:border-success-default focus-visible:ring-lg focus-visible:ring-primary-dimmed",
                    "disabled:cursor-not-allowed disabled:bg-neutral-muted disabled:data-[state=checked]:bg-neutral-muted"
                ])}
                onCheckedChange={changeChecked}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "pointer-events-none block h-sm-plus w-sm-plus rounded-xxl bg-neutral-base shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-sm-extra data-[state=unchecked]:translate-x-xxs"
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
const DecoratableSwitchPrimitive = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchPrimitiveProps
>((props, ref) => {
    const { vm, changeChecked } = useSwitch(props);
    if (!vm.item) {
        return null;
    }

    return <SwitchRenderer {...props} {...vm.item} changeChecked={changeChecked} ref={ref} />;
});
DecoratableSwitchPrimitive.displayName = SwitchPrimitives.Root.displayName;
const SwitchPrimitive = makeDecoratable("SwitchPrimitive", DecoratableSwitchPrimitive);

export { SwitchPrimitive, type SwitchPrimitiveProps, type SwitchPrimitivVm };
