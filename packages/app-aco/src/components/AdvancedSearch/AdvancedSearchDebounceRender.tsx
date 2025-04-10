import React from "react";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useAcoConfig } from "~/config";

interface Props {
    children?: React.ReactNode;
}
/**
 * AdvancedSearchDebounceRenderer is a wrapper component that delays the rendering of its children
 * until all necessary configurations are fully loaded.
 *
 * This component uses a debounced render approach to prevent excessive re-renders as configurations
 * like `acoConfigs` are loaded. By deferring the
 * initial render until these configurations are ready, we ensure that the children are rendered
 * only when the app's environment is fully configured.
 */
export const AdvancedSearchDebounceRenderer = ({ children }: Props) => {
    const [render, setRender] = useState(false);
    const acoConfigs = useAcoConfig();

    const debouncedRender = useMemo(() => {
        return debounce(() => {
            setRender(true);
        }, 10);
    }, [setRender]);

    useEffect(() => {
        if (render) {
            return;
        }

        debouncedRender();

        return () => {
            debouncedRender.cancel();
        };
    }, [acoConfigs]);

    return <>{render ? children : null}</>;
};
