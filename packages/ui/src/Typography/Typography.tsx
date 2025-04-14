import React from "react";
import { Heading, HeadingLevels, Text } from "@webiny/admin-ui";

export declare type TypographyT =
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";

interface TypographyProps {
    use: TypographyT;
    children?: React.ReactNode;
    className?: string;
    /**
     * @deprecated
     */
    style?: React.CSSProperties;
    tag?: string;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Heading` or `Text` components from the `@webiny/admin-ui` package instead.
 */
const Typography = (props: TypographyProps) => {
    const { children, use, className } = props;

    // Define a mapping of use values to heading levels
    const headingLevelMap: { [key: string]: HeadingLevels } = {
        headline1: 1,
        headline2: 2,
        headline3: 3,
        headline4: 4,
        headline5: 5,
        headline6: 6
    };

    if (use in headingLevelMap) {
        const level = headingLevelMap[use];
        return (
            <Heading level={level} className={className}>
                {children}
            </Heading>
        );
    }

    return (
        <Text size={"md"} className={className}>
            {children}
        </Text>
    );
};

export { Typography, TypographyProps };
