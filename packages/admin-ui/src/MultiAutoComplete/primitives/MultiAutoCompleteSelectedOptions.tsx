import React from "react";
import { ReactComponent as Close } from "@material-design-icons/svg/outlined/close.svg";
import { Icon } from "~/Icon";
import { CommandOptionFormatted } from "~/Command";
import { Tag } from "~/Tag";

interface MultiAutoCompleteSelectedOptionsProps {
    options: CommandOptionFormatted[];
    removeOption: (value: string) => void;
}

export const MultiAutoCompleteSelectedOptions = (props: MultiAutoCompleteSelectedOptionsProps) => {
    return (
        <>
            {props.options.map(option => {
                return (
                    <Tag
                        key={option.value}
                        variant={"neutral-light"}
                        label={option.label}
                        icon={
                            <Icon
                                label={"Remove option"}
                                icon={<Close />}
                                onClick={() => props.removeOption(option.value)}
                            />
                        }
                    />
                );
            })}
        </>
    );
};
