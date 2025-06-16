import React from "react";
import { Heading } from "@webiny/admin-ui";
import { ReactComponent as SearchOffIcon } from "@webiny/icons/search_off.svg";

export const NoResults = () => {
    return (
        <div
            className={
                "wby-w-full wby-h-full wby-p-lg wby-flex wby-items-center wby-justify-center wby-bg-neutral-base"
            }
        >
            <div className={"wby-flex wby-flex-col wby-items-center wby-justify-center wby-gap-sm"}>
                <div className={"wby-fill-neutral-strong"}>
                    <SearchOffIcon width={75} height={75} />
                </div>
                <div className={"wby-text-center"}>
                    <Heading level={4} className={"wby-text-neutral-strong"}>
                        {"No results found."}
                    </Heading>
                </div>
            </div>
        </div>
    );
};
