import * as React from "react";
import { OverlayLoader } from "@webiny/admin-ui";

interface CircularProgressProps {
    label?: React.ReactNode;
    size?: number;
    spinnerColor?: string;
    spinnerWidth?: number;
    visible?: boolean;
    style?: React.CSSProperties;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Loader` or `OverlayLoader` components from the `@webiny/admin-ui` package instead.
 */
const CircularProgress = (props: CircularProgressProps) => {
    return <OverlayLoader text={props.label} style={props.style} />;
};

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };

// Needed for backward compatibility.
export default CircularProgress;
