import * as React from "react";
import { Text } from "~/Text";
import { cn } from "~/utils";
import { makeDecoratable } from "@webiny/react-composition";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: React.ReactNode;
    spinnerWidth?: number;
}

const CircularProgressBase = React.forwardRef<HTMLDivElement, CircularProgressProps>(
    (props, ref) => {
        const { text = "", className, spinnerWidth = 48, ...divProps } = props;

        return (
            <div
                ref={ref}
                className={cn(
                    "wby-w-full wby-h-full wby-absolute wby-bg-white wby-bg-opacity-75 wby-top-0 wby-left-0 wby-z-30",
                    className
                )}
                {...divProps}
            >
                <div className="wby-absolute wby-top-1/2 wby-left-1/2 wby-transform wby-translate-x-1/2 wby-translate-y-1/2 wby-flex wby-flex-col wby-justify-center wby-items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={spinnerWidth}
                        height={spinnerWidth}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={"wby-animate-spin wby-text-accent-primary"}
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {props.text && <Text text={text} />}
                </div>
            </div>
        );
    }
);

CircularProgressBase.displayName = "CircularProgress";

const CircularProgress = makeDecoratable("CircularProgress", CircularProgressBase);

export { CircularProgress, CircularProgressProps };
