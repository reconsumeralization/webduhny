import React from "react";

export interface MosaicProps extends Record<string, any> {
    children: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please implement your own `Mosaic` component or reach out on Slack.
 */
const Mosaic = (props: MosaicProps) => {
    return <>{props.children}</>;
};

export { Mosaic };
