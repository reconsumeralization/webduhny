import React, { ReactElement } from "react";
import { Skeleton } from "~/Skeleton";
import { cn } from "~/utils";

const Loader = (): ReactElement => {
    const lines = Array.from(Array(5).keys());

    return (
        <ul className={"wby-list-none wby-p-lg"} data-testid={"default-data-list.loading"}>
            {lines.map(line => (
                <li
                    key={"list-" + line}
                    className={cn(["wby-group", line === lines.length - 1 ? "wby-last-item" : ""])}
                >
                    <div className="wby-flex wby-w-full wby-items-center wby-justify-start wby-gap-lg wby-mb-md group-[.wby-last-item]:wby-mb-none">
                        <Skeleton type={"thumbnail"} size={"xxl"} />
                        <div
                            className={
                                "wby-flex-1 wby-h-10 wby-flex wby-flex-col wby-justify-between"
                            }
                        >
                            <Skeleton type={"text"} size={"md"} />
                            <Skeleton type={"text"} size={"md"} />
                        </div>
                        <div className={"wby-justify-self-end"}>
                            <div className={"wby-text-right wby-flex wby-justify-end wby-gap-sm"}>
                                <Skeleton type={"thumbnail"} size={"lg"} />
                                <Skeleton type={"thumbnail"} size={"lg"} />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export { Loader };
