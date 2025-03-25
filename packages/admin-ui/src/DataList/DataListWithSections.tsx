import React, { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import { Loader } from "~/Loader";
import {
    DataListModal,
    Filters,
    MultiSelectActions,
    MultiSelectAll,
    NoData,
    Pagination,
    RefreshButton,
    Sorters
} from "~/DataList/components";
import { DataListProps } from "~/DataList/types";
import { Heading } from "~/Heading";

const dataListWithSectionsDefaultProps = {
    children: null,
    title: null,
    data: null,
    meta: null,
    loading: false,
    refresh: () => {
        return void 0;
    },
    setPage: null,
    setPerPage: null,
    perPageOptions: [10, 25, 50],
    filters: null,
    sorters: null,
    setSorters: null,
    actions: null,
    multiSelectAll: () => {},
    isAllMultiSelected: () => false,
    isNoneMultiSelected: () => false,
    loader: <Loader />,
    noData: <NoData />,
    showOptions: {
        refresh: true,
        pagination: true,
        sorters: true,
        filters: true
    }
};

export const DataListWithSections = <TData,>(propsInput: DataListProps<TData>) => {
    let render: React.ReactNode | null;

    const props = useMemo(() => {
        return {
            ...dataListWithSectionsDefaultProps,
            ...propsInput
        };
    }, [propsInput]);

    if (props.loading) {
        render = props.loader;
    } else if (isEmpty(props.data)) {
        render = props.noData;
    } else {
        const ch = props.children;
        render = typeof ch === "function" ? ch(props) : null;
    }

    const showOptions = props.showOptions || {};

    return (
        <div data-testid={"ui.list.data-list"}>
            <div className={"wby-pt-md-extra wby-pb-md wby-px-md wby-border"}>
                {(props.title || props.actions) && (
                    <div className={"wby-flex wby-justify-between wby-items-center"}>
                        <Heading className={"wby-text-accent-primary"} level={4}>
                            {props.title}
                        </Heading>
                        <div className={"wby-flex wby-items-center wby-justify-end wby-gap-xs"}>
                            {props.actions}
                        </div>
                    </div>
                )}

                {Object.keys(showOptions).length > 0 && (
                    <div
                        className={
                            "wby-flex wby-items-center wby-justify-space-between wby-gap-sm-extra"
                        }
                    >
                        <div className={"wby-flex-1"}>
                            {props.search ? React.cloneElement(props.search, props) : null}
                        </div>
                        <div
                            className={
                                "wby-flex wby-items-center wby-justify-space-between wby-gap-xs"
                            }
                        >
                            <MultiSelectAll {...props} />
                            {showOptions.refresh && <RefreshButton {...props} />}
                            {showOptions.pagination && <Pagination {...props} />}
                            {showOptions.sorters && <Sorters {...props} />}
                            {showOptions.filters && <Filters {...props} />}
                            {props.modalOverlayAction && props.modalOverlay && (
                                <DataListModal
                                    trigger={props.modalOverlayAction}
                                    content={props.modalOverlay}
                                />
                            )}
                            <MultiSelectActions {...props} />
                        </div>
                    </div>
                )}
            </div>

            <div
                className={
                    "wby-relative wby-h-full wby-overflow-auto wby-border-t-sm wby-border-t-neutral-dimmed webiny-data-list__content"
                }
            >
                {props.subHeader}
                {render}
            </div>
        </div>
    );
};
