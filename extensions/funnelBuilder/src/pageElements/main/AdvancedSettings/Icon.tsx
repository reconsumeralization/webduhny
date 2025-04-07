import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div<Pick<IconProps, "size">>`
    cursor: pointer;
    fill: var(--mdc-theme-text-secondary-on-background);

    svg {
        height: ${({ size = 20 }) => size}px;
        width: ${({ size = 20 }) => size}px;
    }
`;

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    element: React.ReactNode;
    size?: number;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(({ element, ...props }, ref) => {
    return (
        <Wrapper {...props} ref={ref}>
            {element}
        </Wrapper>
    );
});
