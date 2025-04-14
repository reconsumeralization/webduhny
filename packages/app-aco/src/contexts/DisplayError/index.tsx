import React from "react";

interface DisplayErrorProps {
    children: React.ReactNode;
}

export const DisplayError = ({ children }: DisplayErrorProps) => {
    return (
        <div className={"wby-flex wby-w-full wby-h-60vh wby-items-center wby-justify-center"}>
            <div
                className={
                    "wby-flex wby-w-[30vw] wby-min-h-[20vh] wby-items-center wby-justify-center wby-bg-neutral-base wby-font-semibold"
                }
            >
                {children}
            </div>
        </div>
    );
};
