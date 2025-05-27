import React from "react";
import { ContentEntryListConfig, useModel } from "@webiny/app-headless-cms";
import { ReactComponent as LockedIcon } from "@webiny/icons/lock.svg";
import { useRecordLocking } from "~/hooks";
import { UseContentEntriesListHookDecorator } from "./decorators/UseContentEntriesListHookDecorator";
import { UseSaveEntryDecorator } from "~/components/decorators/UseSaveEntryDecorator";
import { UseRecordsDecorator } from "./decorators/UseRecordsDecorator";
import { Icon, Tooltip } from "@webiny/admin-ui";

const { Browser } = ContentEntryListConfig;

interface ActionsCellProps {
    children: React.ReactNode;
}

const ActionsCell = ({ children }: ActionsCellProps) => {
    const { model } = useModel();
    const { getLockRecordEntry, isRecordLocked } = useRecordLocking();

    const { useTableRow, isFolderRow } = Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{children}</>;
    }

    const entry = getLockRecordEntry(row.id);

    if (!isRecordLocked(entry) || !entry?.$locked) {
        return <>{children}</>;
    }
    return (
        <Tooltip
            side={"left"}
            content={`This ${model.name} is currently locked by ${entry.$locked.lockedBy.displayName}.`}
            trigger={<Icon icon={<LockedIcon />} label={"Locked entry"} color={"neutral-light"} />}
        />
    );
};

const RecordLockingCellActions = Browser.Table.Column.createDecorator(Original => {
    return function RecordLockingCellActions(props) {
        if (props.name === "actions" && props.cell) {
            return <Original {...props} cell={<ActionsCell>{props.cell}</ActionsCell>} />;
        }

        return <Original {...props} />;
    };
});

export const HeadlessCmsActionsAcoCell = () => {
    return (
        <>
            <UseContentEntriesListHookDecorator />
            <UseSaveEntryDecorator />
            <RecordLockingCellActions />
            <UseRecordsDecorator />
        </>
    );
};
