import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { HasPermission } from "@webiny/app-security";
import { Dashboard, Layout, NotFound } from "~/index";
import { FileManager } from "~/base/ui/FileManager";
import { uiLayoutPlugin } from "~/plugins/uiLayoutRenderer";
import { WebinyVersion } from "./WebinyVersion";
import { AdminConfig } from "~/config/AdminConfig";
import { ReactComponent as DashboardIcon } from "@material-design-icons/svg/outlined/space_dashboard.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/folder_open.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as SlackIcon } from "@material-design-icons/svg/outlined/numbers.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/route.svg";
import { DropdownMenu } from "@webiny/admin-ui";
import { Link } from "@webiny/admin-ui/Link";

const { Menu, Route } = AdminConfig;

const BaseExtension = () => {
    plugins.register([uiLayoutPlugin]);

    return (
        <AdminConfig>
            <HasPermission name={"fm.file"}>
                <Menu
                    name={"fm"}
                    element={
                        <FileManager>
                            {({ showFileManager }) => (
                                <Menu.Item
                                    label={"File Manager"}
                                    icon={<FileManagerIcon />}
                                    onClick={showFileManager}
                                    data-testid={"admin-drawer-footer-menu-file-manager"}
                                />
                            )}
                        </FileManager>
                    }
                />
            </HasPermission>
            <Menu
                name={"home"}
                before={"$first"}
                element={<Menu.Link label={"Home"} icon={<DashboardIcon />} path={"/"} />}
            />
            <Menu
                name={"settings"}
                after={"$last"}
                element={
                    <Menu.Link
                        label={"Settings"}
                        icon={<SettingsIcon />}
                        path={"/access-management/roles"}
                    />
                }
            />

            <Menu
                name={"support"}
                tags={["footer"]}
                element={
                    <DropdownMenu
                        className={"wby-w-[225px]"}
                        trigger={<Menu.Item icon={<InfoIcon />} label={"Support"} />}
                    >
                        <DropdownMenu.Item
                            content={<Link to={"/api-playground"}>API Playground</Link>}
                            icon={<ApiPlaygroundIcon />}
                        />
                        <DropdownMenu.Item
                            content={
                                <Link
                                    to={"https://www.webiny.com/docs"}
                                    rel={"noopener noreferrer"}
                                    target={"_blank"}
                                >
                                    Documentation
                                </Link>
                            }
                            icon={<DocsIcon />}
                        />
                        <DropdownMenu.Item
                            content={
                                <Link
                                    to={"https://github.com/webiny/webiny-js"}
                                    rel={"noopener noreferrer"}
                                    target={"_blank"}
                                >
                                    GitHub
                                </Link>
                            }
                            icon={<GithubIcon />}
                        />
                        <DropdownMenu.Item
                            content={
                                <Link
                                    to={"https://www.webiny.com/slack"}
                                    rel={"noopener noreferrer"}
                                    target={"_blank"}
                                >
                                    Slack
                                </Link>
                            }
                            icon={<SlackIcon />}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item content={<WebinyVersion />} readOnly />
                    </DropdownMenu>
                }
            />
            <Route
                name={"home"}
                path={"/"}
                element={
                    <Layout title={"Welcome!"}>
                        <Dashboard />
                    </Layout>
                }
            />

            <Route
                name={"default"}
                path={"*"}
                element={
                    <Layout title={"Not Accessible"}>
                        <NotFound />
                    </Layout>
                }
            />
        </AdminConfig>
    );
};

export const Base = memo(BaseExtension);
