import React, { useMemo } from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Browser, BrowserConfig } from "./Browser";
import { CompositionScope } from "@webiny/react-composition";

const base = createConfigurableComponent<PageListConfig>("PageListConfig");

const ScopedPagesListConfig = ({ children }: { children: React.ReactNode }) => {
    return (
        <CompositionScope name={"pb.pages"}>
            <base.Config>{children}</base.Config>
        </CompositionScope>
    );
};

ScopedPagesListConfig.displayName = "PagesListConfig";

export const PageListConfig = Object.assign(ScopedPagesListConfig, { Browser });
export const PageListWithConfig = base.WithConfig;

interface PageListConfig {
    browser: BrowserConfig;
}

export function usePageListConfig() {
    const config = base.useConfig();

    const browser = config.browser || {};

    return useMemo(
        () => ({
            browser: {
                ...browser,
                bulkActions: [...(browser.bulkActions || [])]
            }
        }),
        [config]
    );
}
