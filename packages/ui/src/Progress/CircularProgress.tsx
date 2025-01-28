import * as React from "react";
import { OverlayLoader } from "@webiny/admin-ui";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * @deprecated Use `text` instead.
     */
    label?: React.ReactNode;

    /**
     * @deprecated Will be removed in the future release.
     */
    size?: number;

    /**
     * @deprecated Will be removed in the future release.
     */
    spinnerColor?: string;

    /**
     * @deprecated Will be removed in the future release.
     */
    visible?: boolean;
}

// We needed this default export for backwards compatibility.
const CircularProgress = (props: CircularProgressProps) => {
    return <OverlayLoader text={props.label} style={props.style} className={props.className} />;
};

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };

// Needed for backward compatibility.
export default CircularProgress;
