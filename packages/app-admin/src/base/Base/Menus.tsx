import React from "react";
import { HasPermission } from "@webiny/app-security";
import { FileManager } from "~/base/ui/FileManager";
import { WebinyVersion } from "./Menus/WebinyVersion";
import { SupportMenuItems } from "./Menus/SupportMenuItems";
import { AdminConfig } from "~/config/AdminConfig";
import { ReactComponent as DashboardIcon } from "@material-design-icons/svg/outlined/space_dashboard.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/folder_open.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as SlackIcon } from "@material-design-icons/svg/outlined/numbers.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/route.svg";
import { ReactComponent as MoreIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { DropdownMenu } from "@webiny/admin-ui";

const { Menu } = AdminConfig;

export const Menus = React.memo(() => {
    return (
        <AdminConfig>
            <HasPermission name={"fm.file"}>
                <Menu
                    name={"fm"}
                    element={
                        <FileManager>
                            {({ showFileManager }) => (
                                <Menu.Item
                                    text={"File Manager"}
                                    icon={
                                        <Menu.Item.Icon
                                            label="File Manager"
                                            element={<FileManagerIcon />}
                                        />
                                    }
                                    onClick={() => showFileManager()}
                                    data-testid={"admin-drawer-footer-menu-file-manager"}
                                />
                            )}
                        </FileManager>
                    }
                />
            </HasPermission>
            <Menu
                name={"home"}
                pin={"start"}
                element={
                    <Menu.Link
                        to={"/"}
                        text={"Home"}
                        icon={<Menu.Link.Icon label="Home" element={<DashboardIcon />} />}
                    />
                }
            />
            <Menu
                name={"settings"}
                pin={"end"}
                element={
                    <Menu.Item
                        text={"Settings"}
                        icon={<Menu.Link.Icon label="Settings" element={<SettingsIcon />} />}
                    />
                }
            />

            <Menu.Support
                name={"api-playground"}
                element={
                    <Menu.Support.Link
                        text={"API Playground"}
                        icon={
                            <Menu.Support.Link.Icon
                                label="API Playground"
                                element={<ApiPlaygroundIcon />}
                            />
                        }
                        to={"/api-playground"}
                    />
                }
            />

            <Menu.Support
                name={"docs"}
                element={
                    <Menu.Support.Link
                        text={"Documentation"}
                        icon={<Menu.Support.Link.Icon label="Docs" element={<DocsIcon />} />}
                        to={"https://www.webiny.com/docs"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"github"}
                element={
                    <Menu.Support.Link
                        text={"GitHub"}
                        icon={<Menu.Support.Link.Icon label="GitHub" element={<GithubIcon />} />}
                        to={"https://github.com/webiny/webiny-js"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"slack"}
                element={
                    <Menu.Support.Link
                        text={"Slack"}
                        icon={<Menu.Support.Link.Icon label="Slack" element={<SlackIcon />} />}
                        to={"https://www.webiny.com/slack"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    />
                }
            />

            <Menu.Support
                name={"webiny-version"}
                pin={"end"}
                element={
                    <>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item text={<WebinyVersion />} readOnly />
                    </>
                }
            />

            <Menu.Footer
                name={"support"}
                element={
                    <DropdownMenu
                        className={"wby-w-[225px]"}
                        trigger={
                            <Menu.Item
                                text={"Support"}
                                icon={<Menu.Item.Icon label="Support" element={<InfoIcon />} />}
                                action={<Menu.Item.Action element={<MoreIcon />} />}
                            />
                        }
                    >
                        <SupportMenuItems />
                    </DropdownMenu>
                }
            />
        </AdminConfig>
    );
});

Menus.displayName = "Menus";
