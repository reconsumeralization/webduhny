import * as React from "react";
import { Transition } from "react-transition-group";
import { css } from "emotion";
import noop from "lodash/noop";

import { cn, HeaderBar, IconButton } from "@webiny/admin-ui";
import { ReactComponent as CloseIcon } from "@webiny/icons/close.svg";
import { OverlayView } from "~/ui/views/OverlayView";
import type { ExitHandler } from "react-transition-group/Transition";

const noScroll = css({
    overflow: "hidden",
    height: "100vh"
});

const defaultStyle = {
    transform: "translateY(75vh)",
    opacity: 0,
    transitionProperty: "transform, opacity",
    transitionTimingFunction: "cubic-bezier(0, 0, .2, 1)",
    transitionDuration: "225ms",
    willChange: "opacity, transform"
};

const transitionStyles: Record<string, any> = {
    entering: {
        transform: "translateY(75vh)",
        opacity: 0
    },
    entered: {
        transform: "translateY(0px)",
        opacity: 1
    }
};

export interface OverlayLayoutProps {
    barMiddle?: React.ReactNode;
    barLeft?: React.ReactNode;
    barRight?: React.ReactNode;
    children: React.ReactNode;
    onExited?: ExitHandler<HTMLElement>;
    style?: React.CSSProperties;
    className?: string;
}

interface OverlayLayoutState {
    isVisible: boolean;
}

export class OverlayLayout extends React.Component<OverlayLayoutProps, OverlayLayoutState> {
    constructor(props: OverlayLayoutProps) {
        super(props);
        document.body.classList.add(noScroll);
    }

    static defaultProps: Partial<OverlayLayoutProps> = {
        onExited: noop
    };

    public override state: OverlayLayoutState = {
        isVisible: true
    };

    public hideComponent(): void {
        this.setState({ isVisible: false });
        if (OverlayView.openedViews === 0) {
            document.body.classList.remove(noScroll);
        }
    }

    public override componentWillUnmount(): void {
        if (OverlayView.openedViews === 0) {
            document.body.classList.remove(noScroll);
        }
    }

    public override render() {
        const { onExited, barLeft, barMiddle, barRight, children, className, style, ...rest } =
            this.props;

        return (
            <Transition in={this.state.isVisible} timeout={100} appear onExited={onExited}>
                {state => (
                    <div
                        className={cn(
                            [
                                "wby-fixed wby-top-0 wby-left-0 wby-z-20 wby-h-screen wby-w-screen wby-bg-neutral-base"
                            ],
                            className
                        )}
                        style={{ ...defaultStyle, ...style, ...transitionStyles[state] }}
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
                                        onClick={() => this.hideComponent()}
                                        icon={<CloseIcon />}
                                    />
                                </>
                            }
                        />

                        {children}
                    </div>
                )}
            </Transition>
        );
    }
}
