import React from "react";
import { Grid, Heading, Text } from "@webiny/admin-ui";
import { OperationSelector } from "./OperationSelector";

export interface DetailsProps {
    name: string;
    description?: string;
}

export const Details = (props: DetailsProps) => {
    return (
        <div className={"wby-my-lg"}>
            <Grid>
                <Grid.Column span={9}>
                    <div className={"wby-flex wby-items-start wby-gap-md"}>
                        <div className={"wby-text-left"}>
                            <Heading level={5}>{props.name}</Heading>
                            {props.description && (
                                <Text as={"div"} className={"wby-text-sm"}>
                                    {props.description}
                                </Text>
                            )}
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column span={3} align={"middle"}>
                    <div className={"wby-text-right"}>
                        <OperationSelector name={"operation"} label={"Match all filter groups"} />
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
};
