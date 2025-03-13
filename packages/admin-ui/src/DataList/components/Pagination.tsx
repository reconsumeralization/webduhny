import React from "react";
import { DropdownMenu } from "~/DropdownMenu";
import { NextPageIcon, OptionsIcon, PreviousPageIcon } from "../DataListIcons";
import { DataListProps } from "../types";

const Pagination = (props: DataListProps) => {
    const { pagination } = props;
    if (!pagination) {
        return null;
    }

    return (
        <>
            {pagination.setNextPage && (
                <>
                    <PreviousPageIcon
                        onClick={() => {
                            if (pagination.setPreviousPage && pagination.hasPreviousPage) {
                                pagination.setPreviousPage();
                            }
                        }}
                        size={"lg"}
                    />
                    <NextPageIcon
                        onClick={() => {
                            if (pagination.setNextPage && pagination.hasNextPage) {
                                pagination.setNextPage();
                            }
                        }}
                        size={"lg"}
                    />
                </>
            )}

            {Array.isArray(pagination.perPageOptions) && pagination.setPerPage && (
                <DropdownMenu trigger={<OptionsIcon size={"lg"} />}>
                    {pagination.setPerPage &&
                        pagination.perPageOptions.map(perPage => (
                            <DropdownMenu.Item
                                key={perPage}
                                onClick={() =>
                                    pagination.setPerPage && pagination.setPerPage(perPage)
                                }
                                content={perPage}
                            />
                        ))}
                </DropdownMenu>
            )}
        </>
    );
};

export { Pagination };
