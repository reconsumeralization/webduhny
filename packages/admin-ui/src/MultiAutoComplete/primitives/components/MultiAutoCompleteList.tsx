import React from "react";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { Command } from "~/Command";
import { cn, cva } from "~/utils";
import { Item } from "~/Command/Item";
import { Separator } from "~/Command/Separator";

const multiAutoCompleteListWrapperVariants = cva(
    "animate-in fade-in-0 zoom-in-95 absolute top-xs-plus z-10 w-full outline-none",
    {
        variants: {
            isOpen: {
                true: "block",
                false: "hidden"
            }
        }
    }
);

interface MultiAutoCompleteListProps extends React.ComponentPropsWithoutRef<typeof Command.List> {
    emptyMessage?: React.ReactNode;
    isEmpty?: boolean;
    isLoading?: boolean;
    isOpen?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionCreate?: (value: string) => void;
    onOptionSelect: (value: string) => void;
    optionRenderer?: (item: any, index: number) => React.ReactNode;
    options: CommandOptionFormatted[];
    temporaryOption?: CommandOptionFormatted;
}

export const MultiAutoCompleteList = ({
    emptyMessage,
    isEmpty,
    isLoading,
    isOpen,
    loadingMessage,
    onOptionCreate,
    onOptionSelect,
    optionRenderer,
    options,
    temporaryOption,
    ...props
}: MultiAutoCompleteListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
            if (isEmpty) {
                return null;
            }

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

            if (temporaryOption?.value) {
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
        [onOptionSelect, temporaryOption, onOptionCreate, isEmpty]
    );

    return (
        <div className="relative">
            <div className={cn(multiAutoCompleteListWrapperVariants({ isOpen }))}>
                <Command.List {...props}>
                    {isLoading ? <Command.Loading>{loadingMessage}</Command.Loading> : null}
                    {renderOptions(options)}
                    {!isLoading ? <Command.Empty>{emptyMessage}</Command.Empty> : null}
                </Command.List>
            </div>
        </div>
    );
};
