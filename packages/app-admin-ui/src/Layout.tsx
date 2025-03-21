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
import { HeaderBar } from "@webiny/admin-ui";

export const Layout = LayoutRenderer.createDecorator(() => {
    return function Layout({ title, children }: LayoutProps) {
        return (
            <>
                {title ? <Helmet title={title} /> : null}
                <Navigation />
                <div className={"wby-w-full wby-bg-white"}>
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
