import React from "react";
import { CommandOptionFormatted } from "~/Command/domain/CommandOptionFormatted";
import { Command } from "~/Command";

interface MultiAutoCompleteListProps extends React.ComponentPropsWithoutRef<typeof Command.List> {
    emptyMessage?: React.ReactNode;
    isEmpty?: boolean;
    isLoading?: boolean;
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

            const elements = [
                <Command.Item key={"dummy-element"} value="-" className="wby-hidden" />
            ];

            const renderedItems = items.reduce((acc, item, currentIndex) => {
                acc.push(
                    <Command.Item
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
                    </Command.Item>
                );

                // Conditionally render the separator if `separator` is true
                if (item.separator) {
                    acc.push(<Command.Separator key={`separator-${item.value ?? currentIndex}`} />);
                }

                return acc;
            }, elements);

            if (temporaryOption?.value) {
                renderedItems.push(
                    <Command.Item
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
                    </Command.Item>
                );
            }

            return renderedItems;
        },
        [onOptionSelect, temporaryOption, onOptionCreate, isEmpty, optionRenderer]
    );

    return (
        <Command.List {...props}>
            {isLoading ? (
                <Command.Loading>{loadingMessage}</Command.Loading>
            ) : (
                renderOptions(options)
            )}
            {!isLoading && <Command.Empty>{emptyMessage}</Command.Empty>}
        </Command.List>
    );
};
