import * as React from "react";
import { cn, cva, Grid, Heading, Icon, type VariantProps } from "@webiny/admin-ui";

const simpleFormInnerVariants = cva("wby-mx-auto", {
    variants: {
        size: {
            md: "wby-max-w-[640px]",
            lg: "wby-max-w-[800px]",
            full: "wby-max-w-full"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface SimpleFormProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof simpleFormInnerVariants> {
    children: React.ReactNode;
    noElevation?: boolean;
    className?: string;
}

export const SimpleForm = ({ children, className, size, ...props }: SimpleFormProps) => {
    return (
        <div
            {...props}
            className={cn(["webiny-data-list", "wby-mx-auto wby-p-lg", "wby-relative"], className)}
        >
            <div className={cn(simpleFormInnerVariants({ size }))}>{children}</div>
        </div>
    );
};

const simpleFormHeaderVariants = cva("wby-p-md wby-pl-lg wby-border-sm wby-border-neutral-smoked", {
    variants: {
        rounded: {
            true: "wby-rounded-t-3xl"
        }
    },
    defaultVariants: {
        rounded: true
    }
});

interface SimpleFormHeaderProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof simpleFormHeaderVariants> {
    title: React.ReactNode;
    icon?: React.ReactElement<any>;
    children?: React.ReactNode;
    ["data-testid"]?: string;
}

export const SimpleFormHeader = ({
    children,
    icon,
    title,
    className,
    rounded,
    ...props
}: SimpleFormHeaderProps) => {
    return (
        <div
            className={cn(simpleFormHeaderVariants({ rounded }), className)}
            data-testid={props["data-testid"]}
        >
            <Grid>
                <Grid.Column span={children ? 6 : 12}>
                    <>
                        {icon && <Icon label={title as string} icon={icon} />}
                        <Heading level={4} className={"wby-truncate"}>
                            {title}
                        </Heading>
                    </>
                </Grid.Column>
                <>{children ? <Grid.Column span={6}>{children}</Grid.Column> : null}</>
            </Grid>
        </div>
    );
};

export interface SimpleFormFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const SimpleFormFooter = ({ children, className }: SimpleFormFooterProps) => {
    return (
        <div
            className={cn(
                "wby-p-lg wby-pt-none wby-border-sm wby-border-t-none wby-border-neutral-smoked wby-rounded-b-3xl",
                "wby-flex wby-justify-end wby-gap-sm",
                className
            )}
        >
            {children}
        </div>
    );
};

interface SimpleFormContentProps {
    children: React.ReactNode;
    className?: string;
}

export const SimpleFormContent = ({ children, className }: SimpleFormContentProps) => {
    return (
        <div
            className={cn(
                "wby-p-lg wby-border-sm wby-border-y-none wby-border-neutral-smoked",
                className
            )}
        >
            {children}
        </div>
    );
};
