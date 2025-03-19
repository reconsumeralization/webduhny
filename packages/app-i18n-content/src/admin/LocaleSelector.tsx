import React, { useMemo } from "react";
import { useI18N } from "@webiny/app-i18n/hooks/useI18N";
import { Button, DropdownMenu } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { I18NSecurityPermission } from "@webiny/app-i18n/types";

export const LocaleSelector = () => {
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

    return (
        <DropdownMenu
            trigger={
                <Button
                    variant="ghost"
                    size="md"
                    data-testid={"app-i18n-content.menu"}
                    text={`Locale: ${currentLocale}`}
                />
            }
        >
            {localeList.map(locale => (
                <DropdownMenu.CheckboxItem
                    key={locale.code}
                    checked={currentLocale === locale.code}
                    data-testid={`app-i18n-content.menu-item.${locale.code}`}
                    onClick={() => {
                        setCurrentLocale(locale.code, "content");
                        window.location.reload();
                    }}
                    content={locale.code}
                />
            ))}
        </DropdownMenu>
    );
};
