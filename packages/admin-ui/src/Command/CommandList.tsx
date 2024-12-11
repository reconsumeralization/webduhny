import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { CommandGroup } from "./CommandGroup";
import { CommandItem } from "./CommandItem";
import { CommandSeparator } from "./CommandSeparator";
import { CommandLoading } from "./CommandLoading";
import { CommandEmpty } from "./CommandEmpty";

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
    options: CommandOptionFormatted[];
    temporaryOption?: CommandOptionFormatted;
    emptyMessage?: React.ReactNode;
    isLoading?: boolean;
    allowFreeInput?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionSelect: (value: string) => void;
    onOptionCreate: (value: string) => void;
    optionRenderer?: (item: any, index: number) => React.ReactNode;
}

const CommandList = ({
    className,
    onOptionSelect,
    emptyMessage,
    isLoading,
    loadingMessage,
    options,
    optionRenderer,
    temporaryOption,
    allowFreeInput,
    onOptionCreate,
    ...props
}: CommandListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
            const elements = [<CommandItem key={"dummy-element"} value="-" className="hidden" />];

            const renderedItems = items.reduce((acc, item, currentIndex) => {
                acc.push(
                    <CommandItem
                        key={`item-${item.value}-${currentIndex}`}
                        value={item.value}
                        keywords={[item.label]}
                        disabled={item.disabled}
                        selected={item.selected}
                        onSelect={() => onOptionSelect(item.value)}
                        onMouseDown={event => event.preventDefault()}
                    >
                        {optionRenderer && item.item
                            ? optionRenderer.call(this, item.item, currentIndex)
                            : item.label}
                    </CommandItem>
                );

                // Conditionally render the separator if `separator` is true
                if (item.separator) {
                    acc.push(<CommandSeparator key={`separator-${item.value ?? currentIndex}`} />);
                }

                return acc;
            }, elements);

            if (allowFreeInput && temporaryOption) {
                renderedItems.push(
                    <CommandItem
                        key={`temporary-${temporaryOption.value}`}
                        value={temporaryOption.value}
                        keywords={[temporaryOption.label]}
                        disabled={temporaryOption.disabled}
                        selected={temporaryOption.selected}
                        onSelect={() => onOptionCreate(temporaryOption.value)}
                        onMouseDown={event => event.preventDefault()}
                    >
                        {`Add "${temporaryOption.label}" as new option`}
                    </CommandItem>
                );
            }

            return renderedItems;
        },
        [onOptionSelect, allowFreeInput, temporaryOption, onOptionCreate]
    );

    return (
        <CommandPrimitive.List
            className={cn(
                [
                    "block max-h-96 min-w-56 w-full shadow-lg py-sm overflow-y-auto overflow-x-hidden rounded-sm border-sm border-neutral-muted bg-neutral-base text-neutral-strong"
                ],
                className
            )}
            {...props}
        >
            {isLoading ? <CommandLoading>{loadingMessage}</CommandLoading> : null}
            {options.length > 0 && !isLoading ? (
                <CommandGroup>{renderOptions(options)}</CommandGroup>
            ) : null}
            {!isLoading ? <CommandEmpty>{emptyMessage}</CommandEmpty> : null}
        </CommandPrimitive.List>
    );
};

export { CommandList, type CommandListProps };
