import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ReactComponent as CheckIcon } from "@material-design-icons/svg/outlined/check.svg";
// import { ReactComponent as IndeterminateIcon } from "@material-design-icons/svg/round/horizontal_rule.svg";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, makeDecoratable } from "~/utils";

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
 * Checkbox
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

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants> & {
        label: string | React.ReactNode;
    };

const DecoratableCheckbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, id, label, indeterminate, ...props }, ref) => (
    <div className="flex items-start space-x-sm-extra">
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(checkboxVariants({ indeterminate }), className)}
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
));
DecoratableCheckbox.displayName = CheckboxPrimitive.Root.displayName;
const Checkbox = makeDecoratable("Checkbox", DecoratableCheckbox);

export { Checkbox };
