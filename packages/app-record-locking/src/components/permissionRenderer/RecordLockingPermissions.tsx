import React, { useCallback, useMemo } from "react";
import { i18n } from "@webiny/app/i18n";
import { gridWithPaddingClass, PermissionInfo } from "@webiny/app-admin/components/Permissions";
import { Form } from "@webiny/form";
import { RecordLockingSecurityPermission } from "~/types";
import { Grid, Select } from "@webiny/admin-ui";

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
                    <>
                        <Grid className={gridWithPaddingClass}>
                            <Grid.Column span={6}>
                                <PermissionInfo title={t`Advanced Record Locking`} />
                            </Grid.Column>
                            <Grid.Column span={6}>
                                <Bind name={"canForceUnlock"}>
                                    <Select
                                        options={[
                                            { label: t`No Access`, value: "no" },
                                            { label: t`Full Access`, value: "yes" }
                                        ]}
                                    ></Select>
                                </Bind>
                            </Grid.Column>
                        </Grid>
                    </>
                );
            }}
        </Form>
    );
};
