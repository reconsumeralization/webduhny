import React, { useEffect, useMemo } from "react";
import type {
    DataTableDefaultData,
    DataTableSorting,
    OnDataTableSortingChange
} from "@webiny/admin-ui";
import { Column, ColumnsPresenter, columnsRepositoryFactory } from "./Columns";
import {
    ColumnsVisibilityDecorator,
    ColumnsVisibilityPresenter,
    ColumnsVisibilityUpdater,
    columnsVisibilityRepositoryFactory
} from "./ColumnVisibility";
import { ColumnsVisibilityLocalStorageGateway } from "./gateways";
import { TablePresenter } from "./TablePresenter";
import { TableInner } from "./TableInner";
import { useAcoConfig } from "~/config";

export interface TableProps<T> {
    data: T[];
    loading?: boolean;
    nameColumnId?: string;
    namespace: string;
    onSelectRow?: (rows: T[] | []) => void;
    onSortingChange: OnDataTableSortingChange;
    onToggleRow?: (row: T) => void;
    selected: DataTableDefaultData[];
    sorting: DataTableSorting;
}

export const Table = <T extends Record<string, any> & DataTableDefaultData>({
    namespace,
    ...props
}: TableProps<T>) => {
    const { table } = useAcoConfig();

    const columnsRepo = useMemo(() => {
        return columnsRepositoryFactory.getRepository(
            namespace,
            table.columns.map(column => Column.createFromConfig(column))
        );
    }, [namespace, table.columns]);

    const visibilityRepo = useMemo(() => {
        const columnsVisibilityLocalStorage = new ColumnsVisibilityLocalStorageGateway(namespace);

        return columnsVisibilityRepositoryFactory.getRepository(
            namespace,
            columnsVisibilityLocalStorage
        );
    }, [namespace]);

    const repo = useMemo(() => {
        return new ColumnsVisibilityDecorator(visibilityRepo, columnsRepo);
    }, [visibilityRepo, columnsRepo]);

    const columnsVisibilityUpdater = new ColumnsVisibilityUpdater(visibilityRepo);

    const columnsPresenter = useMemo(() => new ColumnsPresenter(repo), [repo]);

    const columnsVisibilityPresenter = useMemo(
        () => new ColumnsVisibilityPresenter(columnsPresenter),
        [columnsPresenter]
    );

    const tablePresenter = useMemo<TablePresenter>(() => {
        return new TablePresenter();
    }, []);

    useEffect(() => {
        columnsPresenter.init();
    }, [columnsPresenter]);

    return (
        <TableInner
            {...props}
            columnsPresenter={columnsPresenter}
            columnsVisibilityPresenter={columnsVisibilityPresenter}
            tablePresenter={tablePresenter}
            columnsVisibilityUpdater={columnsVisibilityUpdater}
        />
    );
};
