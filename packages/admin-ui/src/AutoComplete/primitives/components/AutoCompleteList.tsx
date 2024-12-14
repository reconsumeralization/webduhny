import React from "react";
import { CommandOptionFormatted } from "~/Command/CommandOptionFormatted";
import { Command } from "~/Command";
import { cn, cva } from "~/utils";

const autoCompleteListWrapperVariants = cva(
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

interface AutoCompleteListProps extends React.ComponentPropsWithoutRef<typeof Command.List> {
    options: CommandOptionFormatted[];
    emptyMessage?: React.ReactNode;
    isLoading?: boolean;
    isOpen?: boolean;
    loadingMessage?: React.ReactNode;
    onOptionSelect: (value: string) => void;
    optionRenderer?: (item: any, index: number) => React.ReactNode;
}

export const AutoCompleteList = ({
    emptyMessage,
    isLoading,
    isOpen,
    loadingMessage,
    onOptionSelect,
    optionRenderer,
    options,
    ...props
}: AutoCompleteListProps) => {
    const renderOptions = React.useCallback(
        (items: CommandOptionFormatted[]) => {
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
        [onOptionSelect, optionRenderer]
    );

    return (
        <div className="relative">
            <div className={cn(autoCompleteListWrapperVariants({ isOpen }))}>
                <Command.List {...props}>
                    {isLoading ? <Command.Loading>{loadingMessage}</Command.Loading> : null}
                    {renderOptions(options)}
                    {!isLoading ? <Command.Empty>{emptyMessage}</Command.Empty> : null}
                </Command.List>
            </div>
        </div>
    );
};
