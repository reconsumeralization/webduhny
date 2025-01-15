import React from "react";
import { CommandOptionFormatted } from "~/Command/domain/CommandOptionFormatted";
import { Command } from "~/Command";

interface AutoCompleteListProps extends React.ComponentPropsWithoutRef<typeof Command.List> {
    options: CommandOptionFormatted[];
    emptyMessage?: React.ReactNode;
    isEmpty?: boolean;
    isLoading?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionSelect: (value: string) => void;
    optionRenderer?: (item: any, index: number) => React.ReactNode;
}

export const AutoCompleteList = ({
    emptyMessage,
    isEmpty,
    isLoading,
    loadingMessage,
    onOptionSelect,
    optionRenderer,
    options,
    ...props
}: AutoCompleteListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
            if (isEmpty) {
                return null;
            }

            const elements = [<Command.Item key={"dummy-element"} value="-" className="hidden" />];

            return items.reduce((acc, item, currentIndex) => {
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
        },
        [onOptionSelect, optionRenderer, isEmpty]
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
