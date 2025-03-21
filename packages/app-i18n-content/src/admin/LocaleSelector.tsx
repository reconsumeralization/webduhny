import React, { useMemo } from "react";
import { useI18N } from "@webiny/app-i18n/hooks/useI18N";
import { Select } from "@webiny/admin-ui";
import { LocaleSelector as BaseLocaleSelector } from "@webiny/app-admin";
import { useSecurity } from "@webiny/app-security";
import { I18NSecurityPermission } from "@webiny/app-i18n/types";

export const LocaleSelector = BaseLocaleSelector.createDecorator(() => {
    return function LocaleSelector() {
        const { setCurrentLocale, getCurrentLocale, getLocales } = useI18N();
        const { identity, getPermission } = useSecurity();

        const contentI18NPermission = useMemo((): I18NSecurityPermission | null => {
            return getPermission("content.i18n");
        }, [identity]);

        const locales = getLocales();
        const localeList = locales.filter(locale => {
            if (!contentI18NPermission || !Array.isArray(contentI18NPermission.locales)) {
                return true;
            }
            return contentI18NPermission.locales.includes(locale.code);
        });

        if (localeList.length === 1) {
            return null;
        }

        const currentLocale = getCurrentLocale("content");
        if (!currentLocale) {
            return null;
        }

        return (
            <Select
                displayResetAction={false}
                value={currentLocale}
                onValueChange={value => {
                    setCurrentLocale(value, "content");
                    window.location.reload();
                }}
                size={"md"}
                variant={"ghost"}
                options={[
                    {
                        label: "Locale",
                        options: [
                            ...localeList.map(locale => ({
                                value: locale.code,
                                label: locale.code
                            }))
                        ]
                    }
                ]}
            />
        );
    };
});
