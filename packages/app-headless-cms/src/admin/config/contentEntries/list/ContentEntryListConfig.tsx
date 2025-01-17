import React, { useMemo } from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Browser, BrowserConfig } from "./Browser";
import { CompositionScope } from "@webiny/react-composition";

const base = createConfigurableComponent<ContentEntryListConfig>("ContentEntryListConfig");

const ScopedContentEntryListConfig = ({ children }: { children: React.ReactNode }) => {
    return (
        <CompositionScope name={"cms"}>
            <base.Config>{children}</base.Config>
        </CompositionScope>
    );
};

ScopedContentEntryListConfig.displayName = "ContentEntryListConfig";

export const ContentEntryListConfig = Object.assign(ScopedContentEntryListConfig, { Browser });
export const ContentEntryListWithConfig = base.WithConfig;

interface ContentEntryListConfig {
    browser: BrowserConfig;
}

export function useContentEntryListConfig() {
    const config = base.useConfig();

    const browser = config.browser || {};

    return useMemo(
        () => ({
            browser: {
                ...browser,
                bulkActions: [...(browser.bulkActions || [])],
                filters: [...(browser.filters || [])],
                filtersToWhere: [...(browser.filtersToWhere || [])]
            }
        }),
        [config]
    );
}
