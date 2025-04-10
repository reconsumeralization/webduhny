import React from "react";
import { Separator } from "@webiny/admin-ui";
import { Search } from "@webiny/app-aco";
import { ButtonFilters } from "./ButtonFilters";
import { ButtonsCreate } from "./ButtonsCreate";
import { Title } from "./Title";

interface HeaderProps {
    isRoot: boolean;
    title?: string;
    canCreateFolder: boolean;
    canCreateContent: boolean;
    onCreateEntry: (event?: React.SyntheticEvent) => void;
    onCreateFolder: (event?: React.SyntheticEvent) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export const Header = (props: HeaderProps) => {
    const {
        canCreateFolder,
        canCreateContent,
        onCreateEntry,
        onCreateFolder,
        title,
        searchValue,
        onSearchChange
    } = props;

    return (
        <>
            <div className={"wby-flex wby-flex-col wby-gap-md"}>
                <Title title={title} isRoot={props.isRoot} />
                <div className={"wby-px-md wby-pb-sm"}>
                    <div className={"wby-flex wby-items-center wby-gap-sm wby-w-full"}>
                        <div className={"wby-flex-1"}>
                            <Search
                                value={searchValue}
                                onChange={onSearchChange}
                                placeholder={"Search..."}
                            />
                        </div>
                        <div>
                            <div className={"wby-flex wby-gap-sm"}>
                                <ButtonFilters />
                                <ButtonsCreate
                                    canCreateFolder={canCreateFolder}
                                    canCreateContent={canCreateContent}
                                    onCreateFolder={onCreateFolder}
                                    onCreateEntry={onCreateEntry}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator variant={"dimmed"} margin={"none"} />
        </>
    );
};
