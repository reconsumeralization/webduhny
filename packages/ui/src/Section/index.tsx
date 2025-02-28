import React from "react";

interface SectionProps {
    title?: string;
    children: React.ReactNode;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please implement your own `Section` component or reach out on Slack.
 */
const Section = ({ children, title, ...props }: SectionProps) => {
    console.warn("The `Section` component is deprecated and will be removed in future releases.");
    return (
        <div {...props}>
            <div>{title}</div>
            <div>{children}</div>
        </div>
    );
};

export default Section;
