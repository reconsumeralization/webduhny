import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Text } from "@webiny/admin-ui";
import { IRecordLockingError, IRecordLockingIdentity } from "~/types";
import { useConfirmationDialog, useSnackbar } from "@webiny/app-admin";
import { useRecordLocking, usePermission } from "~/hooks";
import { useRouter } from "@webiny/react-router";
import { useContentEntriesList } from "@webiny/app-headless-cms";

export interface ILockedRecordForceUnlockProps {
    id: string;
    type: string;
    title: string;
    lockedBy?: IRecordLockingIdentity;
}

const ErrorMessage = (props: ILockedRecordForceUnlockProps) => {
    const { title, lockedBy } = props;
    return (
        <div>
            <Alert type="warning" title="Warning" className={"wby-mb-md"}>
                <strong>{lockedBy?.displayName || "Unknown user"}</strong> is currently editing this
                record.
                <br /> If you force unlock it, they could potentially lose their changes.
            </Alert>

            <Text>
                You are about to forcefully unlock the <strong>{title}</strong> entry. Are you sure
                you want to continue?
            </Text>
        </div>
    );
};

export const LockedRecordForceUnlock = (props: ILockedRecordForceUnlockProps) => {
    const { unlockEntryForce } = useRecordLocking();

    const { navigateTo } = useContentEntriesList();
    const { showConfirmation: showForceUnlockConfirmation } = useConfirmationDialog({
        title: "Force unlock the entry",
        message: <ErrorMessage {...props} />
    });
    const { showSnackbar } = useSnackbar();

    const { history } = useRouter();

    const [error, setError] = useState<IRecordLockingError>();

    useEffect(() => {
        if (!error?.message) {
            return;
        }
        console.error(error);
        showSnackbar(error.message);
    }, [error?.message]);

    const onClick = useCallback(() => {
        showForceUnlockConfirmation(async () => {
            const result = await unlockEntryForce({
                id: props.id,
                $lockingType: props.type
            });
            if (!result.error) {
                navigateTo();
                return;
            }
            setError(result.error);
        });
    }, [props.id, history, navigateTo]);

    const { canForceUnlock } = usePermission();
    if (!canForceUnlock) {
        return null;
    }

    return (
        <div className="wby-mt-md">
            <Text as={"div"} className={"wby-mb-md"}>
                Because you have a full access to the system, you can force unlock the record.
            </Text>
            <Button onClick={onClick} text={"Unlock and go back"} />
        </div>
    );
};
