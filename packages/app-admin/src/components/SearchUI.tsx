import React from "react";

import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import { Icon, InputPrimitive } from "@webiny/admin-ui";

export interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    onEnter?: () => any;
    inputPlaceholder?: string;
}

const Search = ({ value, onChange, onEnter, inputPlaceholder = "Search..." }: SearchProps) => {
    return (
        <InputPrimitive
            id={"search-input"}
            placeholder={inputPlaceholder}
            value={value}
            onChange={onChange}
            onEnter={onEnter}
            autoComplete="off"
            startIcon={<Icon label={"Search"} icon={<SearchIcon />} />}
            variant={"secondary"}
            size={"lg"}
        />
    );
};

export default Search;
