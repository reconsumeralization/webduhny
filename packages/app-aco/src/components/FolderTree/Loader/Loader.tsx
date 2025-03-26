import React from "react";
import { Skeleton } from "@webiny/admin-ui";

interface LoaderProps {
    count?: number;
}

export const Loader = ({ count = 4 }: LoaderProps) => {
    const lines = Array.from({ length: count });

    return (
        <div className={"wby-p-xs"}>
            {lines.map((_, index) => {
                return (
                    <div
                        key={`folder-skeleton-${index}`}
                        className={"wby-mb-xs wby-px-sm wby-py-xs-plus"}
                    >
                        <Skeleton type={"text"} size={"md"} />
                    </div>
                );
            })}
        </div>
    );
};
