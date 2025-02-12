import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { UsersFormView } from "~/ui/views/Users/UsersFormView";
import UsersDataList from "~/ui/views/Users/UsersDataList";
import { UIViewComponent } from "@webiny/app-admin/ui/UIView";
import { useWcp } from "@webiny/app-admin";

export const UsersView = () => {
    const wcp = useWcp();

    const teams = wcp.canUseTeams();

    return (
        <SplitView>
            <LeftPanel>
                <UsersDataList />
            </LeftPanel>
            <RightPanel>
                <UIViewComponent view={new UsersFormView({ teams })} />
            </RightPanel>
        </SplitView>
    );
};
