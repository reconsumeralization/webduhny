import * as React from "react";
import { cn, Grid, Heading, Icon } from "@webiny/admin-ui";

interface SimpleFormProps {
    children: React.ReactNode;
    "data-testid"?: string;
    noElevation?: boolean;
    className?: string;
}

export const SimpleForm = (props: SimpleFormProps) => {
    return (
        <div
            className={cn(
                ["webiny-data-list", "wby-mx-auto wby-p-lg", "wby-relative"],
                props.className
            )}
            data-testid={props["data-testid"]}
        >
            <div style={{ maxWidth: "640px" }} className={"wby-mx-auto"}>
                {props.children}
            </div>
        </div>
    );
};

interface SimpleFormHeaderProps {
    title: React.ReactNode;
    icon?: React.ReactElement<any>;
    children?: React.ReactNode;
    ["data-testid"]?: string;
}

export const SimpleFormHeader = (props: SimpleFormHeaderProps) => {
    return (
        <div
            className={
                "wby-p-md wby-pl-lg wby-border-sm wby-border-neutral-dimmed wby-rounded-t-3xl"
            }
        >
            <Grid data-testid={props["data-testid"]}>
                <Grid.Column span={props.children ? 6 : 12}>
                    <React.Fragment>
                        {props.icon && <Icon label={props.title as string} icon={props.icon} />}
                        <Heading level={4}>{props.title}</Heading>
                    </React.Fragment>
                </Grid.Column>
                <>{props.children ? <Grid.Column span={6}>{props.children}</Grid.Column> : null}</>
            </Grid>
        </div>
    );
};

export interface SimpleFormFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const SimpleFormFooter = ({ children, className }: SimpleFormFooterProps) => {
    return (
        <div
            className={cn(
                "wby-p-lg wby-pt-none wby-border-sm wby-border-t-none wby-border-neutral-dimmed wby-rounded-b-3xl",
                "wby-flex wby-justify-end wby-gap-sm",
                className
            )}
        >
            {children}
        </div>
    );
};

interface SimpleFormContentProps {
    children: React.ReactNode;
}

export const SimpleFormContent = ({ children }: SimpleFormContentProps) => {
    return (
        <div className={"wby-p-lg wby-border-sm wby-border-y-none wby-border-neutral-dimmed"}>
            {children}
        </div>
    );
};
