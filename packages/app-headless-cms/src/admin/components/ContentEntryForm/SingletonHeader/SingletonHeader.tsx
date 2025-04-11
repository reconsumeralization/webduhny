import React from "react";
import { Buttons } from "@webiny/app-admin";
import { SaveAction } from "./SaveAction";
import { Grid, Heading } from "@webiny/admin-ui";

export interface SingletonHeaderProps {
    title: string;
}

export const SingletonHeader = ({ title }: SingletonHeaderProps) => {
    return (
        <div className={"wby-p-md wby-pl-lg wby-border-b-sm wby-border-neutral-dimmed-darker"}>
            <Grid>
                <Grid.Column span={9}>
                    <Heading level={4} className={"wby-truncate"}>
                        {title}
                    </Heading>
                </Grid.Column>
                <Grid.Column span={3}>
                    <div className="wby-flex wby-items-center wby-justify-end">
                        <Buttons actions={[{ name: "save", element: <SaveAction /> }]} />
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
};
