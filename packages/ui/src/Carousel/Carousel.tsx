import React from "react";

interface Props extends Record<string, any> {
    children: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please implement your own `Carousel` component or reach out on Slack.
 */
const Carousel = (props: Props) => {
    console.warn("The `Carousel` component is deprecated and will be removed in future releases.");
    return <>{props.children}</>;
};

export default Carousel;
