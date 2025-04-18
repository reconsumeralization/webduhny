import React, { useEffect, useState } from "react";
import { useRecordLocking } from "~/hooks";
import { LockedRecord } from "../LockedRecord";
import { IRecordLockingLockRecord } from "~/types";
import { CmsContentEntry, CmsModel } from "@webiny/app-headless-cms/types";
import { OverlayLoader } from "@webiny/admin-ui";

export interface IContentEntryGuardProps {
    loading: boolean;
    entry: CmsContentEntry;
    model: CmsModel;
    children: React.ReactElement;
}

export const ContentEntryGuard = (props: IContentEntryGuardProps) => {
    const { loading, entry, model, children } = props;
    const { fetchLockedEntryLockRecord } = useRecordLocking();

    const [locked, setLocked] = useState<IRecordLockingLockRecord | null | undefined>(undefined);

    useEffect(() => {
        if (!entry.id || loading || locked !== undefined) {
            return;
        }
        (async () => {
            const result = await fetchLockedEntryLockRecord({
                id: entry.id,
                $lockingType: model.modelId
            });
            setLocked(result);
        })();
    }, [entry.id, loading]);

    if (locked === undefined) {
        return (
            <div className={"wby-h-screen wby-w-screen wby-fixed wby-top-0 wby-left-0 wby-z-20"}>
                <OverlayLoader />
            </div>
        );
    } else if (locked) {
        return <LockedRecord record={locked} />;
    }

    return children;
};
