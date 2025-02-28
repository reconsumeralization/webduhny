import * as React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import * as SelectPrimitives from "@radix-ui/react-select";
import { type VariantProps } from "~/utils";
import { useSelect } from "./useSelect";
import { SelectOptionDto, SelectOptionFormatted } from "./domains";
import { IconButton } from "~/Button";
import { Icon } from "~/Icon";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    selectTriggerVariants
} from "./components";

const SelectRoot = SelectPrimitives.Root;

const SelectGroup = SelectPrimitives.Group;

const SelectValue = SelectPrimitives.Value;

/**
 * Trigger
 */
type SelectTriggerVm = {
    placeholder: string;
    hasValue: boolean;
};

type SelectTriggerProps = SelectPrimitives.SelectValueProps &
    SelectTriggerVm & {
        size: VariantProps<typeof selectTriggerVariants>["size"];
        variant: VariantProps<typeof selectTriggerVariants>["variant"];
        invalid: VariantProps<typeof selectTriggerVariants>["invalid"];
        startIcon?: React.ReactElement;
        endIcon?: React.ReactElement;
        onValueReset: () => void;
        disabled?: boolean;
    };

const Trigger = ({
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
        <SelectTrigger
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
        </SelectTrigger>
    );
};

/**
 * SelectOptions
 */
type SelectOptionsVm = {
    options: SelectOptionFormatted[];
};

type SelectOptionsProps = SelectOptionsVm;

const SelectOptions = (props: SelectOptionsProps) => {
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

const SelectPrimitiveRenderer = ({
    selectRootProps,
    selectTriggerProps,
    selectOptionsProps,
    onValueChange,
    onValueReset
}: SelectRendererProps) => {
    return (
        <SelectRoot {...selectRootProps} onValueChange={onValueChange}>
            <Trigger {...selectTriggerProps} onValueReset={onValueReset} />
            <SelectOptions {...selectOptionsProps} />
        </SelectRoot>
    );
};

/**
 * Select
 */
type SelectOption = SelectOptionDto | string;

type SelectPrimitiveProps = SelectPrimitives.SelectProps & {
    endIcon?: React.ReactElement;
    invalid?: VariantProps<typeof selectTriggerVariants>["invalid"];
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: SelectOption[];
    placeholder?: string;
    size?: VariantProps<typeof selectTriggerVariants>["size"];
    startIcon?: React.ReactElement;
    variant?: VariantProps<typeof selectTriggerVariants>["variant"];
};

const SelectPrimitive = (props: SelectPrimitiveProps) => {
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

export {
    SelectPrimitive,
    type SelectPrimitiveProps,
    type SelectOptionsVm,
    type SelectTriggerVm,
    type SelectOption
};
