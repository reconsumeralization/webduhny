import React, { useMemo, useState } from "react";
import { Heading, DropdownMenu, List, cn, CheckboxPrimitive, Popover } from "@webiny/admin-ui";
import noop from "lodash/noop";
import isEmpty from "lodash/isEmpty";
import {
    FilterIcon,
    NextPageIcon,
    OptionsIcon,
    PreviousPageIcon,
    RefreshIcon,
    SortIcon
} from "./icons";
import { DataListModalOverlayProvider } from "./DataListModalOverlay";
import Loader from "./Loader";
import NoData from "./NoData";
import { ListProps, ListItemProps } from "../List";
import { PaginationProp, SortersProp } from "./types";

// This was copied from "./types" so that it can be outputted in docs.
interface DataListProps {
    // Pass a function to take full control of list render.
    children?: ((props: any) => React.ReactNode) | null;

    // A title of paginated list.
    title?: React.ReactNode;

    // FormData that needs to be shown in the list.
    data?: Record<string, any>[] | null;

    // A callback that must refresh current view by repeating the previous query.
    refresh?: (() => void) | null;

    // If true, Loader component will be shown, disallowing any interaction.
    loading?: boolean;

    // Provide a custom loader. Shown while the content is loading.
    loader?: React.ReactNode;

    // Provide a custom no data component. Shown while there is no data to be shown.
    noData?: React.ReactNode;

    // Provide all pagination data, options and callbacks here.
    pagination?: PaginationProp;

    // Triggered once a sorter has been selected.
    setSorters?: ((sorter: any) => void) | null;

    // Provide all sorters options and callbacks here.
    sorters?: SortersProp | null;

    // Provide actions that will be shown in the top right corner (eg. export or import actions).
    actions?: React.ReactNode;

    // Provide filters that will be shown in the top left corner (eg. filter by category or status).
    filters?: React.ReactNode;

    // Provide actions that can be executed on one or more multi-selected list items (eg. export or delete).
    multiSelectActions?: React.ReactNode;

    // Provide callback that will be executed once user selects all list items.
    multiSelectAll?: (value: boolean, data: Record<string, any>[] | null) => void;

    // Callback which returns true if all items were selected, otherwise returns false.
    isAllMultiSelected?: (data: Record<string, any>[] | null) => boolean;

    // Callback which returns true if none of the items were selected, otherwise returns false.
    isNoneMultiSelected?: (data: Record<string, any>[] | null) => boolean;

    showOptions?: {
        refresh?: boolean;
        pagination?: boolean;
        filters?: boolean;
        sorters?: boolean;
        [key: string]: any;
    };

    // Provide search UI that will be shown in the top left corner.
    search?: React.ReactElement;
    // Provide simple modal UI that will be shown over the list content.
    modalOverlay?: React.ReactElement;
    // Provide an action element that handle toggling the "Modal overlay".
    modalOverlayAction?: React.ReactElement;
    // Provide additional UI for list sub-header.
    subHeader?: React.ReactElement;

    meta?: Record<string, any> | null;

    setPage?: ((page: string) => void) | null;

    setPerPage?: ((page: string) => void) | null;

    perPageOptions?: number[];
}

const MultiSelectAll = (props: DataListProps) => {
    const { multiSelectActions } = props;
    if (!multiSelectActions) {
        return null;
    }
    /**
     * We can safely cast because we have defaults.
     */
    const { isAllMultiSelected, isNoneMultiSelected, multiSelectAll, data } =
        props as Required<DataListProps>;

    return (
        <>
            {typeof multiSelectAll === "function" && (
                <div className={"wby-size-10 wby-flex wby-items-center wby-justify-center"}>
                    <CheckboxPrimitive
                        indeterminate={!isAllMultiSelected(data) && !isNoneMultiSelected(data)}
                        checked={isAllMultiSelected(data)}
                        onCheckedChange={() => {
                            multiSelectAll(!isAllMultiSelected(data), data);
                        }}
                    />
                </div>
            )}
        </>
    );
};

const MultiSelectActions = (props: DataListProps) => {
    const { multiSelectActions } = props;
    if (!multiSelectActions) {
        return null;
    }

    return multiSelectActions;
};

const RefreshButton = (props: DataListProps) => {
    const refresh = props.refresh;
    if (!refresh) {
        return null;
    }

    return <RefreshIcon onClick={() => refresh()} size={"lg"} />;
};

const Sorters = (props: DataListProps) => {
    const sorters = props.sorters;
    if (!sorters) {
        return null;
    }

    return (
        <DropdownMenu trigger={<SortIcon size={"lg"} />}>
            {sorters.map(sorter => (
                <DropdownMenu.Item
                    key={sorter.label}
                    onClick={() => {
                        if (sorters && props.setSorters) {
                            props.setSorters(sorter.value);
                        }
                    }}
                    content={sorter.label}
                />
            ))}
        </DropdownMenu>
    );
};

const Filters = (props: DataListProps) => {
    const filters = props.filters;
    if (!filters) {
        return null;
    }

    return <DropdownMenu trigger={<FilterIcon size={"lg"} />}>{filters}</DropdownMenu>;
};

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

interface ActionsProps {
    trigger: React.ReactElement;
    content: React.ReactElement;
}

const Actions = (props: ActionsProps) => {
    const [open, setOpen] = useState<boolean>(false);

    if (!props.content || !props.trigger) {
        return null;
    }

    return (
        <Popover open={open} onOpenChange={open => setOpen(open)}>
            <Popover.Trigger asChild>
                <span>{props.trigger}</span>
            </Popover.Trigger>
            <Popover.Content onOpenAutoFocus={e => e.preventDefault()} align={"end"}>
                <div className={"wby-bg-neutral-base wby-p-md"}>{props.content}</div>
            </Popover.Content>
        </Popover>
    );
};

const defaultDataListProps = {
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
    multiSelectAll: noop,
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

export const DataList = (propsInput: DataListProps) => {
    let render: React.ReactNode | null;

    const props = useMemo(() => {
        return {
            ...defaultDataListProps,
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
        <DataListModalOverlayProvider>
            <div data-testid={"ui.list.data-list"}>
                <div className={"wby-pt-md-extra wby-pb-md wby-px-md wby-border"}>
                    {(props.title || props.actions) && (
                        <div
                            className={
                                "wby-flex wby-justify-between wby-items-center wby-mb-md-plus"
                            }
                        >
                            <Heading
                                className={"wby-text-accent-primary"}
                                level={4}
                                text={props.title}
                            />
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
                                    <Actions
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
        </DataListModalOverlayProvider>
    );
};

export interface ScrollListProps extends ListProps {
    children: React.ReactElement<ListItemProps>[];
}

export const ScrollList = (props: ScrollListProps) => {
    return (
        <List
            {...props}
            className={cn("wby-overflow-auto wby-h-[calc(100vh-235px)]", props.className)}
        >
            {props.children}
        </List>
    );
};
