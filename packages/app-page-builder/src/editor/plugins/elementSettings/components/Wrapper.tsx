import React, { ReactElement } from "react";
import { Grid, ColumnProps, cn } from "@webiny/admin-ui";

interface WrapperPropsType {
    label: string;
    containerClassName?: string;
    leftCellSpan?: ColumnProps["span"];
    rightCellSpan?: ColumnProps["span"];
    leftCellClassName?: string;
    rightCellClassName?: string;
    children: ReactElement;
}

const Wrapper = ({
    label,
    containerClassName,
    leftCellSpan = 4,
    rightCellSpan = 8,
    leftCellClassName,
    rightCellClassName,
    children
}: WrapperPropsType) => {
    return (
        <Grid className={cn(containerClassName, "wby-min-h-xl")} gap={"none"}>
            <Grid.Column
                span={leftCellSpan}
                className={cn("wby-flex wby-items-center", leftCellClassName)}
            >
                {label}
            </Grid.Column>
            <Grid.Column
                span={rightCellSpan}
                className={cn("wby-flex wby-items-center", rightCellClassName)}
            >
                {children}
            </Grid.Column>
        </Grid>
    );
};

export default React.memo(Wrapper);
