import React from "react";
import { cn, makeDecoratable } from "~/utils";
import { Separator } from "~/Separator";

interface HeaderBarProps extends React.HTMLAttributes<HTMLDivElement> {
    start?: React.ReactNode;
    middle?: React.ReactNode;
    end?: React.ReactNode;
}

const HeaderBarBase = ({ start, middle, end, className, ...props }: HeaderBarProps) => {
    return (
        <header className={cn("wby-relative wby-w-full", className)} {...props}>
            <div
                className={
                    "wby-grid wby-grid-cols-[1fr_auto_1fr] wby-w-full wby-py-xs-plus wby-px-sm wby-bg-neutral-base"
                }
            >
                <div className="wby-h-full wby-flex wby-items-center wby-justify-self-start">
                    {start}
                </div>
                <div className="wby-h-full wby-flex wby-items-center">{middle}</div>
                <div className="wby-h-full wby-flex wby-items-center wby-justify-self-end">
                    {end}
                </div>
            </div>
            <Separator margin={"none"} variant={"subtle"} />
        </header>
    );
};

const HeaderBar = makeDecoratable("HeaderBar", HeaderBarBase);

export { HeaderBar, type HeaderBarProps };
