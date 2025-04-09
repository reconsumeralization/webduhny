import styled from "@emotion/styled";
import { cn } from "@webiny/admin-ui";
import React from "react";

const Wrapper = styled.div`
    #cms-content-details-tabs > [role="tablist"] {
        display: none;
    }
`;

export const Container = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Wrapper>
            <div
                className={cn(
                    [
                        "wby-bg-neutral-base",
                        "wby-fixed wby-z-15 wby-top-0 wby-left-0",
                        "wby-w-full wby-h-screen"
                    ],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </Wrapper>
    );
};

export const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-direction: column;
    color: var(--mdc-theme-text-primary-on-background);
    position: relative;
    width: 100%;
    margin-left: 10px;
`;

export const EntryTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

interface EntryNameProps {
    isNewEntry?: boolean;
}

export const EntryName = styled.div<EntryNameProps>`
    font-family: var(--mdc-typography-font-family);
    font-size: 20px;
    line-height: 1.4em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${props => (props.isNewEntry ? 0.3 : 1)};
`;

export const EntryVersion = styled.span`
    font-size: 20px;
    color: var(--mdc-theme-text-secondary-on-background);
    margin-left: 5px;
    line-height: 120%;

    @media (max-width: 800px) {
        display: none;
    }
`;

export const EntryMeta = styled.div`
    height: 20px;
    margin: -2px 2px 2px 2px;

    @media (max-width: 960px) {
        display: none;
    }
`;

/**
 * FORM
 */
export const Content = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(["wby-overflow-y-scroll wby-h-[calc(100vh-65px)]", "wby-"], className)}
            {...props}
        >
            {children}
        </div>
    );
};

export const ContentFormWrapper = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("wby-flex wby-justify-center", className)} {...props}>
            {children}
        </div>
    );
};

type ContentFormInnerProps = { width: string };

export const ContentFormInner = styled.div<ContentFormInnerProps>`
    width: ${props => props.width};
`;
