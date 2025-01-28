import React from "react";
import { type ColumnProps, Grid } from "~/Grid";

export interface StyledColumnProps extends ColumnProps {
    index: number;
}

export const StyledColumn = (props: StyledColumnProps) => (
    <Grid.Column
        className="wby-bg-primary wby-text-neutral-light wby-p-2 wby-text-md wby-rounded-sm"
        {...props}
    >
        Col {props.index}
        {props.span && (
            <>
                <br />
                <code>span: {props.span}</code>
            </>
        )}
        {props.offset && (
            <>
                <br />
                <code>offset: {props.offset}</code>
            </>
        )}
    </Grid.Column>
);
