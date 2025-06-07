import React, { useCallback, useEffect, useState } from "react";
import noop from "lodash/noop";
import type { ExitHandler } from "react-transition-group/Transition";
import { OverlayView } from "~/ui/views/OverlayView";
import {
    OverlayBackdrop,
    OverlayContent,
    OverlayHeader,
    overlayHeaderVariants,
    OverlayRoot
} from "./components";
import type { VariantProps } from "@webiny/admin-ui";

const noScrollBodyClassNames = ["wby-overflow-hidden", "wby-h-screen"];

export interface OverlayLayoutProps extends VariantProps<typeof overlayHeaderVariants> {
    barMiddle?: React.ReactNode;
    barLeft?: React.ReactNode;
    barRight?: React.ReactNode;
    children: React.ReactNode;
    onExited?: ExitHandler<HTMLElement>;
}

export const OverlayLayout: React.FC<OverlayLayoutProps> = ({
    barMiddle,
    barLeft,
    barRight,
    children,
    onExited = noop,
    variant
}) => {
    const [visible, setVisible] = useState(true);

    const hideOverlay = useCallback(() => {
        setVisible(false);
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
        <OverlayRoot visible={visible} onExited={onExited}>
            <OverlayContent visible={visible}>
                <>
                    <OverlayHeader
                        start={barLeft}
                        middle={barMiddle}
                        end={barRight}
                        variant={variant}
                        hideOverlay={hideOverlay}
                    />

                    {children}
                </>
            </OverlayContent>
            <OverlayBackdrop visible={visible} hideOverlay={hideOverlay} />
        </OverlayRoot>
    );
};
