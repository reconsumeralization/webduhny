import React, { Fragment, useCallback, useMemo } from "react";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { i18n } from "@webiny/app/i18n";
import { gridNoPaddingClass, PermissionInfo } from "@webiny/app-admin/components/Permissions";
import { Form } from "@webiny/form";
import { RecordLockingSecurityPermission } from "~/types";

const t = i18n.ns("app-record-locking/components/permissionRenderer");

const RECORD_LOCKING_PERMISSION = "recordLocking";

export interface RecordLockingPermissionsProps {
    value: RecordLockingSecurityPermission[];
    onChange: (value: RecordLockingSecurityPermission[]) => void;
}

export const RecordLockingPermissions = ({ value, onChange }: RecordLockingPermissionsProps) => {
    const onFormChange = useCallback(
        (data: RecordLockingSecurityPermission) => {
            const newValue = value.filter(p => {
                return p.name.startsWith(RECORD_LOCKING_PERMISSION) === false;
            });

            if (!data.canForceUnlock || data.canForceUnlock === "no") {
                onChange(newValue);
                return;
            }

            onChange([
                ...newValue,
                {
                    name: "recordLocking",
                    canForceUnlock: "yes"
                }
            ]);
        },
        [value]
    );

    const formData = useMemo(() => {
        if (!Array.isArray(value)) {
            return {};
        }

        const hasFullAccess = value.some(item => item.name === "*");

        if (hasFullAccess) {
            return {
                canForceUnlock: "yes"
            };
        }

        const permissions = value.filter(item => item.name.startsWith(RECORD_LOCKING_PERMISSION));

        if (!permissions.length || !permissions.some(item => !!item.canForceUnlock)) {
            return {};
        }

        return {
            canForceUnlock: "yes"
        };
    }, []);

    return (
        <Form<RecordLockingSecurityPermission> data={formData} onChange={onFormChange}>
            {({ Bind }) => {
                return (
                    <Fragment>
                        <Grid className={gridNoPaddingClass}>
                            <Cell span={6}>
                                <PermissionInfo title={t`Advanced Record Locking`} />
                            </Cell>
                            <Cell span={6}>
                                <Bind name={"canForceUnlock"}>
                                    <Select label={t`Advanced Record Locking`}>
                                        <option value={""}>{t`No Access`}</option>
                                        <option value={"yes"}>{t`Full Access`}</option>
                                    </Select>
                                </Bind>
                            </Cell>
                        </Grid>
                    </Fragment>
                );
            }}
        </Form>
    );
};
