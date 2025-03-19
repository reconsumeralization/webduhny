import React, { Fragment } from "react";
import { HasPermission } from "@webiny/app-security";
import { Layout } from "@webiny/app-admin";
import { GeneralSettings } from "./settingsGroups/GeneralSettings";
import { DefaultPages } from "./settingsGroups/DefaultPages";
import { WebsiteSettingsView } from "./WebsiteSettingsView";
import { FaviconAndLogo } from "./settingsGroups/FaviconAndLogo";
import { SocialMedia } from "./settingsGroups/SocialMedia";
import { HtmlTags } from "./settingsGroups/HtmlTags";
import { WebsiteSettingsWithConfig } from "./config/WebsiteSettingsConfig";

import { AdminConfig } from "@webiny/app-admin";

const { Route } = AdminConfig;

export const WebsiteSettings = () => {
    return (
        <Fragment>
            <HasPermission name={"pb.settings"}>
                <AdminConfig>
                    <Route
                        name={"pb.settings"}
                        path="/settings/page-builder/website"
                        element={
                            <Layout title={"Page Builder - Website Settings"}>
                                <WebsiteSettingsWithConfig>
                                    <WebsiteSettingsView />
                                </WebsiteSettingsWithConfig>
                            </Layout>
                        }
                    />
                </AdminConfig>
            </HasPermission>
            <GeneralSettings />
            <DefaultPages />
            <FaviconAndLogo />
            <SocialMedia />
            <HtmlTags />
        </Fragment>
    );
};
