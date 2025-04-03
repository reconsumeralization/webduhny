import React from "react";
import Helmet from "react-helmet";
import {
    LayoutProps,
    LayoutRenderer,
    LocaleSelector,
    Navigation,
    TenantSelector,
    UserMenu
} from "@webiny/app-admin";
import { HeaderBar, cn, useSidebar } from "@webiny/admin-ui";

export const Layout = LayoutRenderer.createDecorator(() => {
    return function Layout({ title, children }: LayoutProps) {
        const { pinned } = useSidebar();
        return (
            <>
                {title ? <Helmet title={title} /> : null}
                <Navigation />
                <div
                    className={cn(
                        "wby-ml-auto wby-bg-white wby-transition-[max-width,min-width] wby-ease-linear wby-w-full",
                        {
                            "wby-max-w-[calc(100%-theme(spacing.sidebar-expanded))] ": pinned,
                            "wby-max-w-[calc(100%-theme(spacing.sidebar-collapsed))] ": !pinned
                        }
                    )}
                >
                    <HeaderBar
                        end={
                            <div className={"wby-flex"}>
                                <LocaleSelector />
                                <TenantSelector />
                                <UserMenu />
                            </div>
                        }
                    />
                    <main className={"wby-relative"}>{children}</main>
                </div>
            </>
        );
    };
});
