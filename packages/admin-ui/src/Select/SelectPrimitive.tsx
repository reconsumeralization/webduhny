import * as React from "react";
import { ReactComponent as ChevronUp } from "@material-design-icons/svg/outlined/keyboard_arrow_up.svg";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import * as SelectPrimitives from "@radix-ui/react-select";
import { cn, makeDecoratable, cva, type VariantProps } from "~/utils";
import { useSelect } from "./useSelect";
import { SelectOptionDto } from "./SelectOptionDto";
import { SelectOptionFormatted } from "./SelectOptionFormatted";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";

const SelectRoot = SelectPrimitives.Root;

const SelectGroup = SelectPrimitives.Group;

const SelectValue = SelectPrimitives.Value;

/**
 * SelectIcon
 */
type SelectIconProps = {
    icon: React.ReactElement;
};

const SelectIcon = ({ icon }: SelectIconProps) => {
    return (
        <SelectPrimitives.Icon asChild className={"wby-h-md wby-w-md"}>
            {React.cloneElement(icon)}
        </SelectPrimitives.Icon>
    );
};

/**
 * Trigger
 */
const triggerVariants = cva(
    [
        "wby-w-full wby-flex wby-items-center wby-justify-between wby-gap-sm wby-border-sm wby-text-md wby-relative",
        "focus:wby-outline-none",
        "disabled:wby-pointer-events-none"
    ],
    {
        variants: {
            variant: {
                primary: [
                    "wby-bg-neutral-base wby-border-neutral-muted wby-text-neutral-strong placeholder:wby-text-neutral-dimmed wby-fill-neutral-xstrong",
                    "hover:wby-border-neutral-strong",
                    "focus:wby-border-neutral-black",
                    "disabled:wby-bg-neutral-disabled disabled:wby-border-neutral-dimmed disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled disabled:wby-fill-neutral-disabled"
                ],
                secondary: [
                    "wby-bg-neutral-light wby-border-neutral-subtle wby-text-neutral-strong placeholder:wby-text-neutral-muted wby-fill-neutral-xstrong",
                    "hover:wby-bg-neutral-dimmed",
                    "focus:wby-border-neutral-black focus:wby-bg-neutral-base",
                    "disabled:wby-bg-neutral-disabled disabled:wby-border-neutral-dimmed disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled disabled:wby-fill-neutral-disabled"
                ],
                ghost: [
                    "wby-bg-neutral-base wby-border-transparent wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-bg-neutral-light",
                    "focus:wby-bg-neutral-light",
                    "disabled:wby-bg-neutral-disabled disabled:wby-border-neutral-dimmed disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled disabled:wby-fill-neutral-disabled"
                ]
            },
            size: {
                md: [
                    "wby-rounded-md",
                    "wby-py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                lg: [
                    "wby-rounded-md",
                    "wby-py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                xl: [
                    "wby-rounded-lg wby-leading-6",
                    "wby-py-[calc(theme(padding.md)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.md)-theme(borderWidth.sm))]"
                ]
            },
            invalid: {
                true: ""
            }
        },
        compoundVariants: [
            {
                variant: "primary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "secondary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "ghost",
                invalid: true,
                class: "!wby-border-destructive-subtle !wby-bg-destructive-subtle"
            }
        ],
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);

interface TriggerProps
    extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger>,
        VariantProps<typeof triggerVariants> {
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
    resetButton?: React.ReactElement;
}

const DecoratableTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.Trigger>,
    TriggerProps
>(
    (
        {
            className,
            children,
            size,
            variant,
            startIcon,
            endIcon = <ChevronDown />,
            resetButton,
            disabled,
            invalid,
            ...props
        },
        ref
    ) => (
        <SelectPrimitives.Trigger
            ref={ref}
            className={cn(triggerVariants({ variant, size, invalid, className }))}
            disabled={disabled}
            {...props}
        >
            {startIcon && <SelectIcon icon={startIcon} />}
            {children}
            {resetButton}
            <SelectIcon icon={endIcon} />
        </SelectPrimitives.Trigger>
    )
);
DecoratableTrigger.displayName = SelectPrimitives.Trigger.displayName;

const Trigger = makeDecoratable("Trigger", DecoratableTrigger);

/**
 * SelectScrollUpButton
 */
const DecoratableSelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitives.ScrollUpButton
        ref={ref}
        className={cn(
            "wby-flex wby-cursor-default wby-items-center wby-justify-center wby-pb-sm wby-fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <ChevronUp className="wby-h-md wby-w-md" />
    </SelectPrimitives.ScrollUpButton>
));
DecoratableSelectScrollUpButton.displayName = SelectPrimitives.ScrollUpButton.displayName;

const SelectScrollUpButton = makeDecoratable(
    "SelectScrollUpButton",
    DecoratableSelectScrollUpButton
);

/**
 * SelectScrollDownButton
 */
const DecoratableSelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitives.ScrollDownButton
        ref={ref}
        className={cn(
            "wby-flex wby-cursor-default wby-items-center wby-justify-center wby-pt-sm wby-fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <ChevronDown className="wby-h-md wby-w-md" />
    </SelectPrimitives.ScrollDownButton>
));
DecoratableSelectScrollDownButton.displayName = SelectPrimitives.ScrollDownButton.displayName;

const SelectScrollDownButton = makeDecoratable(
    "SelectScrollDownButton",
    DecoratableSelectScrollDownButton
);

/**
 * SelectContent
 */
const selectContentVariants = cva([
    "wby-relative wby-z-50 wby-max-h-96 wby-min-w-56 wby-shadow-lg wby-py-sm wby-overflow-hidden wby-rounded-sm wby-border-sm wby-border-neutral-muted wby-bg-neutral-base wby-text-neutral-strong",
    "data-[state=open]:wby-animate-in data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out-0 data-[state=open]:wby-fade-in-0 data-[state=closed]:wby-zoom-out-95 data-[state=open]:wby-zoom-in-95 data-[side=bottom]:wby-slide-in-from-top-2 data-[side=left]:wby-slide-in-from-right-2 data-[side=right]:wby-slide-in-from-left-2 data-[side=top]:wby-slide-in-from-bottom-2",
    "data-[side=bottom]:wby-translate-y-1 data-[side=left]:wby--translate-x-1 data-[side=right]:wby-translate-x-1 data-[side=top]:wby--translate-y-1"
]);

interface SelectContentProps
    extends React.ComponentPropsWithoutRef<typeof SelectPrimitives.Content>,
        VariantProps<typeof selectContentVariants> {}

const DecoratableSelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.Content>,
    SelectContentProps
>(({ className, children, ...props }, ref) => (
    <SelectPrimitives.Portal>
        <SelectPrimitives.Content
            ref={ref}
            className={cn(selectContentVariants({ className }))}
            position={"popper"}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitives.Viewport
                className={cn([
                    "wby-py-xs",
                    "wby-h-[var(--radix-select-trigger-height)] wby-w-full wby-min-w-[var(--radix-select-trigger-width)]"
                ])}
            >
                {children}
            </SelectPrimitives.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitives.Content>
    </SelectPrimitives.Portal>
));
DecoratableSelectContent.displayName = SelectPrimitives.Content.displayName;

const SelectContent = makeDecoratable("SelectContent", DecoratableSelectContent);

/**
 * SelectLabel
 */
const DecoratableSelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitives.Label
        ref={ref}
        className={cn(
            [
                "wby-py-sm wby-px-md wby-text-neutral-strong wby-text-sm wby-font-semibold wby-uppercase"
            ],
            className
        )}
        {...props}
    />
));
DecoratableSelectLabel.displayName = SelectPrimitives.Label.displayName;

const SelectLabel = makeDecoratable("SelectLabel", DecoratableSelectLabel);

/**
 * SelectItem
 */
const DecoratableSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitives.Item
        ref={ref}
        className={cn(
            [
                "wby-flex wby-items-center wby-justify-between wby-gap-sm-extra wby-cursor-default wby-select-none wby-rounded-sm wby-p-sm wby-mx-sm wby-text-md wby-outline-none",
                "wby-bg-neutral-base wby-text-neutral-primary wby-fill-neutral-xstrong",
                "focus:wby-bg-neutral-dimmed",
                "data-[disabled]:wby-text-neutral-disabled data-[disabled]:wby-cursor-not-allowed",
                "data-[state=checked]:wby-font-semibold"
            ],
            className
        )}
        {...props}
    >
        <SelectPrimitives.ItemText>{children}</SelectPrimitives.ItemText>
        <SelectPrimitives.ItemIndicator>
            <Check className="wby-h-md wby-w-h-md" />
        </SelectPrimitives.ItemIndicator>
    </SelectPrimitives.Item>
));
DecoratableSelectItem.displayName = SelectPrimitives.Item.displayName;

const SelectItem = makeDecoratable("SelectItem", DecoratableSelectItem);

/**
 * SelectSeparator
 */
const DecoratableSelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitives.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitives.Separator
        ref={ref}
        className={cn("wby--mx-sm wby-my-sm wby-h-px wby-bg-neutral-strong", className)}
        {...props}
    />
));
DecoratableSelectSeparator.displayName = SelectPrimitives.Separator.displayName;

const SelectSeparator = makeDecoratable("SelectSeparator", DecoratableSelectSeparator);

/**
 * Trigger
 */
type SelectTriggerVm = {
    placeholder: string;
    hasValue: boolean;
};

type SelectTriggerProps = SelectPrimitives.SelectValueProps &
    SelectTriggerVm & {
        size: VariantProps<typeof triggerVariants>["size"];
        variant: VariantProps<typeof triggerVariants>["variant"];
        invalid: VariantProps<typeof triggerVariants>["invalid"];
        startIcon?: React.ReactElement;
        endIcon?: React.ReactElement;
        onValueReset: () => void;
        disabled?: boolean;
    };

const DecoratableSelectTrigger = ({
    hasValue,
    size,
    variant,
    startIcon,
    endIcon,
    invalid,
    onValueReset,
    disabled,
    ...props
}: SelectTriggerProps) => {
    const resetButton = React.useMemo(() => {
        if (!hasValue) {
            return undefined;
        }

        return (
            <IconButton
                onPointerDown={event => {
                    event.stopPropagation();
                    onValueReset();
                }}
                icon={
                    <span>
                        <Icon icon={<Close />} label={"Reset"} />
                    </span>
                }
                size={"xs"}
                variant={"secondary"}
                disabled={disabled}
                asChild
            />
        );
    }, [hasValue, onValueReset, disabled]);

    return (
        <Trigger
            size={size}
            variant={variant}
            invalid={invalid}
            startIcon={startIcon}
            endIcon={endIcon}
            resetButton={resetButton}
        >
            <div className={"wby-flex-1 wby-text-left wby-truncate"}>
                <SelectValue {...props} />
            </div>
        </Trigger>
    );
};

const SelectTrigger = makeDecoratable("SelectTrigger", DecoratableSelectTrigger);

/**
 * SelectOptions
 */
type SelectOptionsVm = {
    options: SelectOptionFormatted[];
};

type SelectOptionsProps = SelectOptionsVm;

const DecoratableSelectOptions = (props: SelectOptionsProps) => {
    const renderOptions = React.useCallback((items: SelectOptionFormatted[]) => {
        return items.map((item, index) => {
            const elements = [];

            if (item.options.length > 0) {
                // Render as a group if there are nested options
                elements.push(
                    <SelectGroup key={`group-${index}`}>
                        <SelectLabel>{item.label}</SelectLabel>
                        {renderOptions(item.options)}
                    </SelectGroup>
                );
            }

            if (item.value) {
                // Render as a select item if there are no nested options
                elements.push(
                    <SelectItem
                        key={`item-${item.value}`}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </SelectItem>
                );
            }

            // Conditionally render the separator if hasSeparator is true
            if (item.separator) {
                elements.push(<SelectSeparator key={`separator-${item.value ?? index}`} />);
            }

            return elements;
        });
    }, []);

    return <SelectContent>{renderOptions(props.options)}</SelectContent>;
};

const SelectOptions = makeDecoratable("SelectOptions", DecoratableSelectOptions);

/**
 * SelectRenderer
 */
type SelectRootProps = SelectPrimitives.SelectProps;

type SelectRendererProps = {
    selectRootProps: Omit<SelectRootProps, "onValueChange">;
    selectTriggerProps: Omit<SelectTriggerProps, "onValueReset">;
    selectOptionsProps: SelectOptionsProps;
    onValueChange: (value: string) => void;
    onValueReset: () => void;
};

const DecoratableSelectPrimitiveRenderer = ({
    selectRootProps,
    selectTriggerProps,
    selectOptionsProps,
    onValueChange,
    onValueReset
}: SelectRendererProps) => {
    return (
        <SelectRoot {...selectRootProps} onValueChange={onValueChange}>
            <SelectTrigger {...selectTriggerProps} onValueReset={onValueReset} />
            <SelectOptions {...selectOptionsProps} />
        </SelectRoot>
    );
};

const SelectPrimitiveRenderer = makeDecoratable(
    "SelectPrimitiveRenderer",
    DecoratableSelectPrimitiveRenderer
);

/**
 * Select
 */
type SelectOption = SelectOptionDto | string;

type SelectPrimitiveProps = SelectPrimitives.SelectProps & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof triggerVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: SelectOption[];
    placeholder?: string;
    size?: VariantProps<typeof triggerVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof triggerVariants>["variant"];
};

const DecoratableSelectPrimitive = (props: SelectPrimitiveProps) => {
    const { vm, changeValue, resetValue } = useSelect(props);
    const { size, variant, startIcon, endIcon, invalid, disabled, ...selectRootProps } = props;

    return (
        <SelectPrimitiveRenderer
            selectRootProps={{ ...selectRootProps, disabled }}
            selectTriggerProps={{
                ...vm.selectTrigger,
                size,
                variant,
                startIcon,
                endIcon,
                invalid,
                disabled
            }}
            selectOptionsProps={vm.selectOptions}
            onValueChange={changeValue}
            onValueReset={resetValue}
        />
    );
};

const SelectPrimitive = makeDecoratable("SelectPrimitive", DecoratableSelectPrimitive);

export {
    SelectPrimitive,
    SelectPrimitiveRenderer,
    type SelectOption,
    type SelectRootProps,
    type SelectTriggerProps,
    type SelectOptionsProps,
    type SelectPrimitiveProps,
    type SelectRendererProps,
    type SelectTriggerVm,
    type SelectOptionsVm
};
