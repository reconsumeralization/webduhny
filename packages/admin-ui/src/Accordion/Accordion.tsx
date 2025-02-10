import React, { useMemo } from "react";
import { makeDecoratable, withStaticProps, cva, type VariantProps, cn } from "~/utils";
import { AccordionRoot } from "./components/AccordionRoot";
import { AccordionItem, type AccordionItemProps } from "./components/AccordionItem";

const accordionVariants = cva("wby-group wby-w-full", {
    variants: {
        variant: {
            container: "wby-accordion-variant-container wby-gap-xs wby-flex wby-flex-col",
            underline: "wby-accordion-variant-underline "
        },
        background: {
            base: "wby-accordion-background-base",
            light: "wby-accordion-background-light",
            transparent: "wby-accordion-background-transparent"
        }
    },
    defaultVariants: {
        variant: "underline",
        background: "base"
    }
});

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot> &
    VariantProps<typeof accordionVariants> & {
        children: React.ReactNode;
    };

const AccordionBase = ({
    children,
    variant,
    background,
    className,
    ...baseRootProps
}: AccordionProps) => {
    const rootProps = useMemo(() => {
        const rootProps = { ...baseRootProps };
        if (rootProps.type !== "multiple") {
            // For single accordion, make it collapsible by default.
            rootProps.collapsible = rootProps.collapsible !== false;
        }
        return rootProps;
    }, [baseRootProps]);

    return (
        <AccordionRoot
            {...rootProps}
            className={cn(accordionVariants({ variant, background }), className)}
        >
            {children}
        </AccordionRoot>
    );
};

const DecoratableAccordion = makeDecoratable("Accordion", AccordionBase);

const Accordion = withStaticProps(DecoratableAccordion, {
    Item: AccordionItem
});

export { Accordion, type AccordionProps, type AccordionItemProps };
