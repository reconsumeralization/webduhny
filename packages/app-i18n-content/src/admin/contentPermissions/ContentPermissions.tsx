import React, { Fragment, useCallback, useMemo } from "react";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { useI18N } from "@webiny/app-i18n/hooks/useI18N";
import { I18NSecurityPermission } from "@webiny/app-i18n/types";
import { CheckboxGroup, Grid, RadioGroup } from "@webiny/admin-ui";

const t = i18n.ns("app-i18n/admin/plugins/permissionRenderer");

interface ContentPermissionsProps {
    value: I18NSecurityPermission[];
    onChange: (value: I18NSecurityPermission[]) => void;
}
export const ContentPermissions = ({ value, onChange }: ContentPermissionsProps) => {
    const { getLocales } = useI18N();

    const onFormChange = useCallback((formData: I18NSecurityPermission) => {
        let newValue: I18NSecurityPermission[] = [];
        if (Array.isArray(value)) {
            // Let's just filter out the `content*` permission objects, it's easier to build new ones from scratch.
            newValue = value.filter(item => !item.name.startsWith("content"));
        }

        const permission: I18NSecurityPermission = {
            name: "content.i18n",
            locales: undefined
        };
        if (formData.level === "locales") {
            permission.locales = Array.isArray(formData.locales) ? formData.locales : [];
        }
        newValue.push(permission);
        onChange(newValue);
    }, []);

    const formData = useMemo((): Partial<I18NSecurityPermission> => {
        const defaultData: Omit<I18NSecurityPermission, "name"> = {
            level: undefined,
            locales: []
        };
        if (Array.isArray(value) === false) {
            return defaultData;
        }

        const permission = value.find(item => item.name === "content.i18n");
        if (!permission) {
            return defaultData;
        }

        if (Array.isArray(permission.locales)) {
            return { level: "locales", locales: permission.locales };
        }

        return { level: "all" };
    }, []);

    return (
        <Form
            data={formData}
            onChange={data => {
                /**
                 * We are positive that data is I18NSecurityPermission.
                 */
                return onFormChange(data as unknown as I18NSecurityPermission);
            }}
        >
            {({ data, Bind }) => (
                <Fragment>
                    <Grid>
                        <Grid.Column span={12}>
                            <Bind name={"level"}>
                                <RadioGroup
                                    label={t`Content can be accessed on:`}
                                    items={[
                                        {
                                            label: t`All locales`,
                                            value: "all"
                                        },
                                        {
                                            label: t`Specific locales`,
                                            value: "locales"
                                        }
                                    ]}
                                />
                            </Bind>
                        </Grid.Column>
                        <>
                            {data.level === "locales" && (
                                <Grid.Column span={12}>
                                    <Bind name={"locales"}>
                                        <CheckboxGroup
                                            label={t`Available Locales`}
                                            description={t`The user will be able to access content in the selected locales.`}
                                            items={getLocales().map(locale => ({
                                                value: locale.code,
                                                label: locale.code
                                            }))}
                                        />
                                    </Bind>
                                </Grid.Column>
                            )}
                        </>
                    </Grid>
                </Fragment>
            )}
        </Form>
    );
};
