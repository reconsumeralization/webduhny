import React from "react";
import { Grid, Heading, Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as WidgetIcon } from "@webiny/icons/table_chart.svg";

export interface ApplicationWidgetProps {
    name: string;
    title: string;
    description: string;
    cta: React.ReactNode;
    icon?: React.ReactElement;
}

export const ApplicationWidget = ({
    name,
    title,
    description,
    cta,
    icon = <WidgetIcon />
}: ApplicationWidgetProps) => {
    return (
        <Grid.Column span={4} key={name}>
            <div className={"wby-p-lg wby-bg-primary-subtle wby-rounded-xl"} data-testid={name}>
                <div className={"wby-flex wby-items-center wby-gap-sm wby-mb-sm"}>
                    <Icon icon={icon} label={title} size={"lg"} color={"accent"} />
                    <Heading level={4}>{title}</Heading>
                </div>
                <Text>{description}</Text>
                <div className={"wby-mt-xl"}>{cta}</div>
            </div>
        </Grid.Column>
    );
};
