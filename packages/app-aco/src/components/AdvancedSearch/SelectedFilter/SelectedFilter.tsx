import React from "react";
import { cn, IconButton, buttonVariants } from "@webiny/admin-ui";
import { ReactComponent as Close } from "@webiny/icons/close.svg";
import { FilterDTO } from "~/components/AdvancedSearch/domain";

interface SelectedFilterProps {
    filter: FilterDTO;
    onEdit: () => void;
    onDelete: () => void;
}

export const SelectedFilter = (props: SelectedFilterProps) => {
    return (
        <div
            role={"button"}
            className={cn(buttonVariants({ variant: "tertiary" }), "wby-gap-xs wby-cursor-pointer")}
            onClick={props.onEdit}
        >
            <span className={"wby-truncate wby-max-w-[256px]"}>{props.filter.name}</span>
            <IconButton icon={<Close />} onClick={props.onDelete} size={"xs"} variant={"ghost"} />
        </div>
    );
};
