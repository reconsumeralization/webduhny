import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, withStaticProps } from "~/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Tooltip Content
 */
const tooltipContentVariants = cva(
    [
        "wby-z-50 wby-px-sm-extra wby-py-sm wby-max-w-64 wby-rounded-md wby-text-sm wby-font-normal wby-animate-in wby-fade-in-0 wby-zoom-in-95",
        "data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out-0 data-[state=closed]:wby-zoom-out-95",
        "data-[side=bottom]:wby-slide-in-from-top-2 data-[side=left]:wby-slide-in-from-right-2 data-[side=right]:wby-slide-in-from-left-2 data-[side=top]:wby-slide-in-from-bottom-2"
    ],
    {
        variants: {
            variant: {
                accent: "wby-bg-neutral-dark wby-text-neutral-light",
                subtle: "wby-bg-neutral-base wby-text-neutral-primary wby-shadow-md"
            },
            hiddenArrow: {
                true: [
                    "data-[side=top]:wby-mb-xs-plus",
                    "data-[side=bottom]:wby-mt-xs-plus",
                    "data-[side=left]:wby-mr-xs-plus",
                    "data-[side=right]:wby-ml-xs-plus"
                ]
            }
        },
        defaultVariants: {
            variant: "accent"
        }
    }
);

type TooltipContentProps = TooltipPrimitive.TooltipContentProps &
    VariantProps<typeof tooltipContentVariants>;

const DecoratableTooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
>(({ className, variant, hiddenArrow, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={4}
            className={cn(tooltipContentVariants({ variant, hiddenArrow, className }))}
            {...props}
        />
    </TooltipPrimitive.Portal>
));

DecoratableTooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipContent = makeDecoratable("TooltipArrow", DecoratableTooltipContent);

/**
 * Tooltip Arrow
 */
const tooltipArrowVariants = cva("", {
    variants: {
        variant: {
            accent: "wby-fill-bg-neutral-dark",
            subtle: "wby-fill-neutral-base"
        }
    },
    defaultVariants: {
        variant: "accent"
    }
});

type TooltipArrowProps = TooltipPrimitive.TooltipArrowProps &
    VariantProps<typeof tooltipArrowVariants>;

const DecoratableTooltipArrow = ({ variant, className, ...props }: TooltipArrowProps) => (
    <TooltipPrimitive.Arrow
        {...props}
        width={12}
        height={6}
        className={cn(tooltipArrowVariants({ variant, className }))}
    />
);

DecoratableTooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipArrow = makeDecoratable("TooltipArrow", DecoratableTooltipArrow);

/**
 * Tooltip
 */
interface TooltipProps extends Omit<TooltipPrimitive.TooltipContentProps, "content" | "children"> {
    align?: TooltipPrimitive.TooltipContentProps["align"];
    content: React.ReactNode;
    onOpenChange?: TooltipPrimitive.TooltipProps["onOpenChange"];
    showArrow?: boolean;
    side?: TooltipPrimitive.TooltipContentProps["side"];
    variant?: TooltipContentProps["variant"];
    trigger: React.ReactNode;
}

const DecoratableTooltip = ({
    align,
    content,
    onOpenChange,
    showArrow = true,
    side,
    variant,
    trigger,
    ...props
}: TooltipProps) => {
    return (
        <TooltipRoot delayDuration={500} onOpenChange={onOpenChange}>
            <TooltipTrigger asChild>
                <span>{trigger}</span>
            </TooltipTrigger>
            <TooltipContent
                side={side}
                align={align}
                sideOffset={4}
                variant={variant}
                hiddenArrow={!showArrow}
                {...props}
            >
                {content}
                {showArrow && <TooltipArrow variant={variant} />}
            </TooltipContent>
        </TooltipRoot>
    );
};

const Tooltip = withStaticProps(makeDecoratable("Tooltip", DecoratableTooltip), {
    Provider: TooltipProvider
});

export { Tooltip, type TooltipProps };
