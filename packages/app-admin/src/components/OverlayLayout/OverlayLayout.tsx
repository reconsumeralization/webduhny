import React, { useCallback, useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import noop from "lodash/noop";

import { cn, HeaderBar, IconButton } from "@webiny/admin-ui";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";
import { OverlayView } from "~/ui/views/OverlayView";
import type { ExitHandler } from "react-transition-group/Transition";

const noScrollBodyClassNames = ["wby-overflow-hidden", "wby-h-screen"];

export interface OverlayLayoutProps {
    barMiddle?: React.ReactNode;
    barLeft?: React.ReactNode;
    barRight?: React.ReactNode;
    children: React.ReactNode;
    onExited?: ExitHandler<HTMLElement>;
    style?: React.CSSProperties;
    className?: string;
}

export const OverlayLayout: React.FC<OverlayLayoutProps> = ({
    barMiddle,
    barLeft,
    barRight,
    children,
    onExited = noop,
    className,
    style,
    ...rest
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const hideComponent = useCallback(() => {
        setIsVisible(false);
        if (OverlayView.openedViews === 0) {
            noScrollBodyClassNames.forEach(className => document.body.classList.remove(className));
        }
    }, []);

    useEffect(() => {
        noScrollBodyClassNames.forEach(className => document.body.classList.add(className));
        return () => {
            if (OverlayView.openedViews === 0) {
                noScrollBodyClassNames.forEach(className =>
                    document.body.classList.remove(className)
                );
            }
        };
    }, []);

    return (
        <Transition in={isVisible} timeout={100} appear onExited={onExited}>
            {() => {
                return (
                    <>
                        <div
                            data-state={isVisible ? "open" : "closed"}
                            className={cn(
                                [
                                    "wby-fixed wby-inset-x-0 wby-top-lg wby-z-20",
                                    "wby-w-screen",
                                    "wby-rounded-t-lg wby-overflow-hidden",
                                    "wby-bg-neutral-base",
                                    "wby-transition wby-ease-in-out",
                                    "data-[state=open]:wby-animate-in data-[state=open]:wby-slide-in-from-bottom data-[state=open]:wby-fade-in data-[state=open]:wby-duration-500",
                                    "data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out data-[state=closed]:wby-duration-150"
                                ],
                                className
                            )}
                            style={{ ...style, height: "calc(100vh - 24px)" }}
                            {...rest}
                        >
                            <HeaderBar
                                start={<div className={"wby-pl-md"}>{barLeft}</div>}
                                middle={barMiddle}
                                end={
                                    <>
                                        {barRight}
                                        <IconButton
                                            variant={"ghost"}
                                            size={"md"}
                                            iconSize={"lg"}
                                            onClick={hideComponent}
                                            icon={<CloseIcon />}
                                        />
                                    </>
                                }
                            />
                            {children}
                        </div>
                        <div
                            onClick={hideComponent}
                            data-state={isVisible ? "open" : "closed"}
                            className={cn(
                                "wby-fixed wby-inset-0 wby-z-15 wby-bg-neutral-dark/50",
                                "wby-transition wby-ease-in-out",
                                "data-[state=open]:wby-animate-in data-[state=open]:wby-fade-in data-[state=open]:wby-duration-500",
                                "data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out data-[state=closed]:wby-duration-150"
                            )}
                        />
                    </>
                );
            }}
        </Transition>
    );
};
