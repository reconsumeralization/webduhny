import React from "react";
import { Icon, Input } from "@webiny/admin-ui";
import { ReactComponent as SearchIcon } from "@webiny/icons/search.svg";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
    return (
        <Input
            value={value}
            onChange={onChange}
            size={"md"}
            variant={"secondary"}
            startIcon={<Icon label={"Search"} icon={<SearchIcon />} />}
            className={"wby-w-[256px]"}
        />
    );
};
