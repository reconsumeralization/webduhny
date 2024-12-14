import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "~/utils";
import { CommandOptionFormatted } from "./CommandOptionFormatted";
import { Group } from "./Group";
import { Item } from "./Item";
import { Separator } from "./Separator";
import { Loading } from "./Loading";
import { Empty } from "./Empty";

interface ListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
    options: CommandOptionFormatted[];
    temporaryOption?: CommandOptionFormatted;
    emptyMessage?: React.ReactNode;
    isLoading?: boolean;
    allowFreeInput?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionSelect: (value: string) => void;
    onOptionCreate?: (value: string) => void;
    optionRenderer?: (item: any, index: number) => React.ReactNode;
}

const List = ({
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
}: ListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
            const elements = [<Item key={"dummy-element"} value="-" className="hidden" />];

            const renderedItems = items.reduce((acc, item, currentIndex) => {
                acc.push(
                    <Item
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
                    </Item>
                );

                // Conditionally render the separator if `separator` is true
                if (item.separator) {
                    acc.push(<Separator key={`separator-${item.value ?? currentIndex}`} />);
                }

                return acc;
            }, elements);

            if (allowFreeInput && temporaryOption?.value) {
                renderedItems.push(
                    <Item
                        key={`temporary-${temporaryOption.value}`}
                        value={temporaryOption.value}
                        keywords={[temporaryOption.label]}
                        disabled={temporaryOption.disabled}
                        selected={temporaryOption.selected}
                        onSelect={() => {
                            onOptionCreate && onOptionCreate(temporaryOption.value);
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        {`Add "${temporaryOption.label}" as new option`}
                    </Item>
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
            {isLoading ? <Loading>{loadingMessage}</Loading> : null}
            {options.length > 0 && !isLoading ? <Group>{renderOptions(options)}</Group> : null}
            {!isLoading ? <Empty>{emptyMessage}</Empty> : null}
        </CommandPrimitive.List>
    );
};

export { List, type ListProps };
