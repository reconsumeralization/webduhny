import React, { useEffect } from "react";
import { useRecordLocking } from "~/hooks";
import type {
    IIsRecordLockedParams,
    IRecordLockingIdentity,
    IRecordLockingLockRecord
} from "~/types";
import type { IncomingGenericData } from "@webiny/app-websockets";
import { useWebsockets } from "@webiny/app-websockets";
import { parseIdentifier } from "@webiny/utils";
import { useDialogs } from "@webiny/app-admin";
import { CmsContentEntry, CmsModel } from "@webiny/app-headless-cms/types";

export interface IContentEntryLockerProps {
    entry: CmsContentEntry;
    model: CmsModel;
    onEntryUnlocked: () => void;
    onDisablePrompt: (flag: boolean) => void;
    children: React.ReactElement;
}

export interface IKickOutWebsocketsMessage extends IncomingGenericData {
    data: {
        record: IRecordLockingLockRecord;
        user: IRecordLockingIdentity;
    };
}
interface IForceUnlockedProps {
    user: IRecordLockingIdentity;
}
const ForceUnlocked = ({ user }: IForceUnlockedProps) => {
    return (
        <>
            The entry you were editing was forcefully unlocked by{" "}
            <strong>{user.displayName || "Unknown user"}</strong>. Unfortunately, this means you
            lost the unsaved changes.
        </>
    );
};

export const ContentEntryLocker = ({
    onEntryUnlocked,
    onDisablePrompt,
    entry,
    model,
    children
}: IContentEntryLockerProps) => {
    const { updateEntryLock, unlockEntry, fetchLockedEntryLockRecord, removeEntryLock } =
        useRecordLocking();
    const websockets = useWebsockets();
    const { showDialog } = useDialogs();

    useEffect(() => {
        if (!entry.id) {
            return;
        }
        const { id: entryId } = parseIdentifier(entry.id);

        const removeEntryLockCb = async () => {
            const record: IIsRecordLockedParams = {
                id: entryId,
                $lockingType: model.modelId
            };
            removeEntryLock(record);
            await unlockEntry(record);
        };

        let onMessageSub = websockets.onMessage<IKickOutWebsocketsMessage>(
            `recordLocking.entry.kickOut.${entryId}`,
            async incoming => {
                const { user } = incoming.data;
                onDisablePrompt(true);
                await removeEntryLockCb();
                showDialog({
                    title: "Entry was forcefully unlocked!",
                    content: <ForceUnlocked user={user} />,
                    acceptLabel: "Ok",
                    onClose: undefined,
                    cancelLabel: undefined
                });
                onEntryUnlocked();
            }
        );

        return () => {
            onMessageSub.off();
            /**
             * Lets null subscriptions, just in case it...
             */
            // @ts-expect-error
            onMessageSub = null;
        };
    }, [entry.id, onEntryUnlocked, model.modelId]);

    useEffect(() => {
        if (!entry.id) {
            return;
        }

        const record: IIsRecordLockedParams = {
            id: entry.id,
            $lockingType: model.modelId
        };
        updateEntryLock(record);

        return () => {
            (async () => {
                const result = await fetchLockedEntryLockRecord(record);
                if (result) {
                    return;
                }
                removeEntryLock(record);
                await unlockEntry(record);
            })();
        };
    }, [entry.id]);

    return <>{children}</>;
};
