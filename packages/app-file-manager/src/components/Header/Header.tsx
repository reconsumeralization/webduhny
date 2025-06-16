import React from "react";
import { FilesRenderChildren } from "react-butterfiles";
import { Grid, Separator } from "@webiny/admin-ui";

import { Actions } from "./Actions";
import { Title } from "./Title";

export interface BrowseFilesHandler {
    browseFiles: FilesRenderChildren["browseFiles"];
}

export interface HeaderProps {
    browseFiles: BrowseFilesHandler["browseFiles"];
}

export const Header = (props: HeaderProps) => {
    return (
        <div>
            <div className={"wby-pl-lg wby-pr-md wby-py-sm-extra"}>
                <Grid>
                    <Grid.Column span={6}>
                        <Title />
                    </Grid.Column>
                    <Grid.Column span={6}>
                        <Actions browseFiles={props.browseFiles} />
                    </Grid.Column>
                </Grid>
            </div>
            <Separator />
        </div>
    );
};
