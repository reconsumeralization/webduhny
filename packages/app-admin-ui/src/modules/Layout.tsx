import React from "react";
import Helmet from "react-helmet";
import {
    Compose,
    LayoutProps,
    LayoutRenderer,
    Navigation,
    LocaleSelector,
    UserMenu
} from "@webiny/app-admin";
import { HeaderBar } from "@webiny/admin-ui";

const AdminUiLayout = () => {
    return function AdminUiLayout({ title, children }: LayoutProps) {
        return (
            <>
                {title ? <Helmet title={title} /> : null}
                <Navigation />

                <div className={"wby-w-full wby-bg-white"}>
                    <HeaderBar
                        end={
                            <>
                                <LocaleSelector />
                                <UserMenu />
                            </>
                        }
                    />
                    <main className={"wby-relative"}>{children}</main>
                </div>
            </>
        );
    };
};

export const Layout = () => {
    return <Compose component={LayoutRenderer} with={AdminUiLayout} />;
};
