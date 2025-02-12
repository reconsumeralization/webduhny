import { useContentEntriesList, useContentEntry } from "@webiny/app-headless-cms";
import React, { useEffect } from "react";
import { useRecordLocking } from "~/hooks";
import { IIsRecordLockedParams, IRecordLockingIdentity, IRecordLockingLockRecord } from "~/types";
import { IncomingGenericData, useWebsockets } from "@webiny/app-websockets";
import { parseIdentifier } from "@webiny/utils";
import { useDialogs } from "@webiny/app-admin";
import styled from "@emotion/styled";

const Bold = styled.span`
    font-weight: 600;
`;

export interface IContentEntryLockerProps {
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
            <Bold>{user.displayName || "Unknown user"}</Bold>. Unfortunately, this means you lost
            the unsaved changes.
        </>
    );
};

export const ContentEntryLocker = ({ onDisablePrompt, children }: IContentEntryLockerProps) => {
    const { entry, contentModel: model } = useContentEntry();
    const { updateEntryLock, unlockEntry, fetchLockedEntryLockRecord, removeEntryLock } =
        useRecordLocking();

    const { navigateTo } = useContentEntriesList();

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
                navigateTo();
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
    }, [entry.id, navigateTo, model.modelId]);

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
