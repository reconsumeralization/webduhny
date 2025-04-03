import React from "react";
import { makeDecoratable } from "~/utils";
import { Separator } from "~/Separator";

interface HeaderBarProps {
    start?: React.ReactNode;
    middle?: React.ReactNode;
    end?: React.ReactNode;
}

const HeaderBarBase = ({ start, middle, end }: HeaderBarProps) => {
    return (
        <>
            <div
                className={
                    "wby-grid wby-grid-cols-[1fr_auto_1fr] wby-items-center wby-w-full wby-py-xs-plus wby-px-sm wby-bg-white"
                }
            >
                <div className="wby-flex wby-items-center wby-justify-self-start">{start}</div>
                <div className="wby-flex wby-items-center wby-justify-self-center">{middle}</div>
                <div className="wby-flex wby-items-center wby-justify-self-end">{end}</div>
            </div>
            <Separator margin={"none"} variant={"subtle"} />
        </>
    );
};

const HeaderBar = makeDecoratable("HeaderBar", HeaderBarBase);

export { HeaderBar, type HeaderBarProps };
