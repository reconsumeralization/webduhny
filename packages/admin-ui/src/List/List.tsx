import * as React from "react";
import { makeDecoratable, withStaticProps, cva, type VariantProps, cn } from "~/utils";
import { ListItem, type ListItemProps } from "./components";

const listVariants = cva("wby-group wby-w-full", {
    variants: {
        variant: {
            container: "wby-list-variant-container",
            underline: "wby-list-variant-underline"
        },
        background: {
            base: "wby-list-background-base",
            light: "wby-list-background-light",
            transparent: "wby-list-background-transparent"
        }
    },
    defaultVariants: {
        variant: "underline",
        background: "base"
    }
});

interface ListProps
    extends VariantProps<typeof listVariants>,
        Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    children: React.ReactNode;
}

const DecoratableList = ({ children, variant, background, className, ...props }: ListProps) => {
    return (
        <div {...props} className={cn(listVariants({ variant, background }), className)}>
            {children}
        </div>
    );
};

const List = withStaticProps(makeDecoratable("List", DecoratableList), {
    Item: ListItem
});

export { List, type ListProps, type ListItemProps };
