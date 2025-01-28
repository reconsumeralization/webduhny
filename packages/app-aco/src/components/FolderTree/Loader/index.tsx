import React from "react";
import { Skeleton } from "@webiny/ui/Skeleton";

interface LoaderProps {
    count?: number;
}

export const Loader = ({ count = 4 }: LoaderProps) => {
    const lines = Array.from({ length: count });

    return (
        <div className={"wby-p-xs"}>
            {lines.map((_, index) => {
                return (
                    <Skeleton
                        key={`folder-skeleton-${index}`}
                        type={"text"}
                        size={"lg"}
                        className={"wby-my-sm"}
                    />
                );
            })}
        </div>
    );
};
