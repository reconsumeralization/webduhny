import React from "react";
import { cn } from "~/utils";
import { makeDecoratable } from "@webiny/react-composition";
import { Heading } from "~/Heading";
import { Text } from "~/Text";
import { cva, type VariantProps } from "class-variance-authority";

const cardRootVariants = cva("wby-flex wby-flex-col wby-bg-neutral-base wby-gap-y-md-plus wby-text-sm", {
    variants: {
        padding: {
            standard: "wby-p-lg",
            comfortable: "wby-p-xl",
            compact: "wby-p-md"
        },
        elevation: {
            none: "",
            xs: "wby-shadow-xs",
            sm: "wby-shadow-sm",
            md: "wby-shadow-md",
            lg: "wby-shadow-lg",
            xl: "wby-shadow-xl"
        },
        borderRadius: {
            none: "wby-rounded-none",
            sm: "wby-rounded-sm",
            md: "wby-rounded-md"
        }
    },
    defaultVariants: {
        padding: "standard",
        elevation: "none",
        borderRadius: "md"
    }
});

interface CardRootProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        VariantProps<typeof cardRootVariants> {}

const CardRootBase = React.forwardRef<HTMLDivElement, CardRootProps>(
    ({ className, padding, elevation, borderRadius, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardRootVariants({ padding, elevation, borderRadius, className }))}
            {...props}
        />
    )
);

CardRootBase.displayName = "CardRoot";

const CardRoot = makeDecoratable("CardRoot", CardRootBase);

interface CardProps extends CardRootProps, VariantProps<typeof cardRootVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    options?: React.ReactNode;
}

type CardHeaderProps = Pick<CardProps, "title" | "description" | "options">;

const CardHeaderBase = ({ title, description, options }: CardHeaderProps) => {
    if (!title && !description && !options) {
        return null;
    }

    return (
        <div className={"wby-flex wby-flex-row wby-justify-between"}>
            <div className={"wby-flex wby-flex-col wby-gap-y-xs"}>
                {typeof title === "string" ? <Heading level={6} as={"h1"} text={title} /> : title}
                {typeof description === "string" ? (
                    <Text text={description} size="sm" className={"wby-text-neutral-strong"} />
                ) : (
                    description
                )}
            </div>
            <div>{options}</div>
        </div>
    );
};

CardHeaderBase.displayName = "CardHeader";

const CardHeader = makeDecoratable("CardHeader", CardHeaderBase);

type CardFooterProps = Pick<CardProps, "actions">;

const CardFooterBase = ({ actions }: CardFooterProps) => {
    if (!actions) {
        return null;
    }

    return <div className={"wby-flex wby-justify-end wby-gap-sm"}>{actions}</div>;
};

CardFooterBase.displayName = "CardFooter";

const CardFooter = makeDecoratable("CardFooter", CardFooterBase);

const CardBase = (props: CardProps) => {
    const { title, description, actions, children, options, ...rest } = props;

    return (
        <CardRoot {...rest}>
            <CardHeader title={title} description={description} options={options} />
            {children}
            <CardFooter actions={actions} />
        </CardRoot>
    );
};

const Card = makeDecoratable("Card", CardBase);

export { Card, type CardProps };
