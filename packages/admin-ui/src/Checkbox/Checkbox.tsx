import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ReactComponent as CheckIcon } from "@material-design-icons/svg/outlined/check.svg";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, makeDecoratable } from "~/utils";
import { useCheckbox } from "./useCheckbox";

/**
 * Indeterminate Icon
 */
const IndeterminateIcon = () => {
    return (
        <span
            className={
                "block w-2 h-0.5 rounded-sm bg-primary-default group-disabled:bg-primary-disabled"
            }
        />
    );
};

/**
 * Checkbox Renderer
 */
const checkboxVariants = cva(
    [
        "group peer h-4 w-4 shrink-0 rounded-sm border-sm mt-xxs",
        "border-neutral-muted bg-neutral-base fill-neutral-base ring-offset-background",
        "hover:border-neutral-dark",
        "focus:outline-none focus-visible:border-accent-default focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-disabled",
        "data-[state=checked]:bg-primary-default data-[state=checked]:border-transparent",
        "data-[state=checked]:hover:bg-primary-strong",
        "data-[state=checked]:disabled:bg-neutral-disabled data-[state=checked]:disabled:fill-neutral-strong"
    ],
    {
        variants: {
            indeterminate: {
                true: [
                    "border-neutral-muted",
                    "data-[state=checked]:bg-neutral-base data-[state=checked]:border-neutral-muted",
                    "data-[state=checked]:hover:bg-neutral-base data-[state=checked]:hover:border-neutral-strong",
                    "data-[state=checked]:focus-visible:border-accent-default",
                    "data-[state=checked]:disabled:border-transparent"
                ]
            }
        }
    }
);

type CheckboxProps = Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "defaultChecked" | "checked" | "onCheckedChange"
> &
    VariantProps<typeof checkboxVariants> & {
        id: string;
        label: string | React.ReactNode;
        checked: boolean;
        disabled: boolean;
        indeterminate: boolean;
        onCheckedChange: (checked: boolean) => void;
    };

type CheckboxVm = Omit<CheckboxProps, "onCheckedChange">;

interface CheckboxRendererProps {
    vm: CheckboxVm;
    changeChecked: (checked: boolean) => void;
}

const DecoratableCheckboxRenderer = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxRendererProps
>(({ vm, changeChecked }, ref) => {
    const { indeterminate, className, label, id, ...props } = vm;

    return (
        <div className="flex items-start space-x-sm-extra">
            <CheckboxPrimitive.Root
                ref={ref}
                id={id}
                className={cn(checkboxVariants({ indeterminate }), className)}
                onCheckedChange={changeChecked}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn("flex items-center justify-center text-current")}
                >
                    {indeterminate ? <IndeterminateIcon /> : <CheckIcon className={"h-3 w-3"} />}
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
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
DecoratableCheckboxRenderer.displayName = "CheckboxRenderer";
const CheckboxRenderer = makeDecoratable("CheckboxRenderer", DecoratableCheckboxRenderer);

/**
 * Checkbox
 */
const DecoratableCheckbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>((props, ref) => {
    const { vm, changeChecked } = useCheckbox(props);
    console.log("vm", vm);
    return <CheckboxRenderer vm={vm} changeChecked={changeChecked} ref={ref} />;
});
DecoratableCheckbox.displayName = CheckboxPrimitive.Root.displayName;
const Checkbox = makeDecoratable("Checkbox", DecoratableCheckbox);

export { Checkbox, CheckboxRenderer, type CheckboxProps, type CheckboxVm };
