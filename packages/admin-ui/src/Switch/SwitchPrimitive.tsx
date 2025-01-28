import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn, cva, makeDecoratable, VariantProps } from "~/utils";
import { Label } from "~/Label";
import { useSwitch } from "./useSwitch";
import { SwitchItemFormatted } from "./SwitchItemFormatted";
import { SwitchItemDto } from "./SwitchItemDto";

/**
 * Switch Renderer
 */

const switchVariants = cva("wby-inline-flex wby-items-start wby-space-x-sm", {
    variants: {
        labelPosition: {
            start: "",
            end: "wby-flex-row-reverse wby-space-x-sm-extra wby-space-x-reverse"
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
    SwitchItemDto & {
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
>(({ id, label, changeChecked, className, labelPosition, disabled, required, ...props }, ref) => {
    return (
        <div className={cn(switchVariants({ labelPosition, className }))}>
            <Label
                id={id}
                text={label}
                disabled={disabled}
                required={required}
                weight={"light"}
                className={"wby-text-md"}
            />
            <SwitchPrimitives.Root
                ref={ref}
                {...props}
                id={id}
                className={cn([
                    "wby-peer wby-inline-flex wby-h-md wby-w-[26px] wby-mt-xxs wby-shrink-0 wby-cursor-pointer wby-items-center wby-rounded-xxl wby-border-sm wby-transition-colors",
                    "wby-border-transparent data-[state=checked]:wby-bg-secondary-default data-[state=unchecked]:wby-bg-neutral-strong",
                    "focus-visible:wby-outline-none focus-visible:wby-border-success-default focus-visible:wby-ring-lg focus-visible:wby-ring-primary-dimmed",
                    "disabled:wby-cursor-not-allowed disabled:wby-bg-neutral-muted disabled:data-[state=checked]:wby-bg-neutral-muted"
                ])}
                disabled={disabled}
                onCheckedChange={changeChecked}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "wby-pointer-events-none wby-block wby-h-sm-plus wby-w-sm-plus wby-rounded-xxl wby-bg-neutral-base wby-shadow-lg wby-ring-0 wby-transition-transform data-[state=checked]:wby-translate-x-sm-extra data-[state=unchecked]:wby-translate-x-xxs"
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
