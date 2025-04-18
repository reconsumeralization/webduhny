import React, { useCallback } from "react";
import { i18n } from "@webiny/app/i18n";
import { PermissionSelector } from "./PermissionSelector";
import { useCmsData } from "./useCmsData";
import { BindComponent } from "@webiny/form/types";
import { CmsSecurityPermission } from "~/types";
import { Grid, Select } from "@webiny/admin-ui";
import { PermissionsGroup } from "@webiny/app-admin/components/Permissions";

const t = i18n.ns("app-headless-cms/admin/plugins/permissionRenderer");

interface ContentModelGroupPermissionProps {
    Bind: BindComponent;
    data: CmsSecurityPermission;
    entity: string;
    title: string;
    locales: string[];
    disabled?: boolean;
}
const ContentModelGroupPermission = ({
    Bind,
    data,
    entity,
    title,
    locales,
    disabled
}: ContentModelGroupPermissionProps) => {
    const modelsGroups = useCmsData(locales);

    const getItems = useCallback(
        (code: string) => {
            return modelsGroups[code]["groups"];
        },
        [modelsGroups]
    );

    const endpoints = data.endpoints || [];

    const disabledPrimaryActions =
        [undefined, "own", "no"].includes(data[`${entity}AccessScope`]) ||
        !endpoints.includes("manage");

    return (
        <PermissionsGroup title={title}>
            <Grid>
                <Grid.Column span={12}>
                    <Bind name={`${entity}AccessScope`} defaultValue={"full"}>
                        <Select
                            label={t`Access Scope`}
                            disabled={disabled}
                            options={[
                                {
                                    value: "full",
                                    label: t`All groups`
                                },
                                {
                                    value: "groups",
                                    label: t`Only specific groups`
                                },
                                ...((endpoints.includes("manage") && [
                                    {
                                        value: "own",
                                        label: t`Only groups created by the user`
                                    }
                                ]) ||
                                    [])
                            ]}
                        />
                    </Bind>
                </Grid.Column>
                <>
                    {data[`${entity}AccessScope`] === "groups" && (
                        <Grid.Column span={12}>
                            <PermissionSelector
                                disabled={disabled}
                                locales={locales}
                                Bind={Bind}
                                entity={entity}
                                selectorKey={"groups"}
                                getItems={getItems}
                            />
                        </Grid.Column>
                    )}
                </>
                <Grid.Column span={12}>
                    <Bind name={`${entity}RWD`}>
                        <Select
                            label={t`Primary Actions`}
                            placeholder={"Read-only"}
                            disabled={disabled || disabledPrimaryActions}
                            options={[
                                {
                                    value: "r",
                                    label: t`Read-only`
                                },
                                ...(endpoints.includes("manage")
                                    ? [
                                          {
                                              value: "rw",
                                              label: t`Read, write`
                                          },
                                          {
                                              value: "rwd",
                                              label: t`Read, write, delete`
                                          }
                                      ]
                                    : [])
                            ]}
                        />
                    </Bind>
                </Grid.Column>
            </Grid>
        </PermissionsGroup>
    );
};

export default ContentModelGroupPermission;
