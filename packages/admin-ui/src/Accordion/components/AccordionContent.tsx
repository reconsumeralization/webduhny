import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cva, type VariantProps, cn } from "~/utils";

const collapsiblePrimitiveVariants = cva(
    [
        "wby-overflow-hidden wby-text-md",
        "wby-transition-all data-[state=closed]:wby-animate-collapsible-up data-[state=open]:wby-animate-collapsible-down"
    ],
    {
        // Using pixel values here because of non-existing design tokens.
        variants: {
            padding: {
                expanded: "",
                collapsed: ""
            },
            withIcon: {
                true: ""
            },
            withHandle: {
                true: ""
            }
        },
        compoundVariants: [
            {
                withIcon: true,
                padding: "expanded",
                className: "wby-pl-9"
            },
            {
                withHandle: true,
                padding: "expanded",
                className: "wby-pl-5"
            },
            {
                withIcon: true,
                withHandle: true,
                padding: "expanded",
                className: "wby-pl-14"
            },
        ],
        defaultVariants: {
            withIcon: false,
            withHandle: false,
            padding: "expanded"
        }
    }
);

const contentDivVariants = cva("wby-pt-sm wby-pb-lg wby-pl-md", {
    variants: {
        padding: {
            collapsed: "wby-pr-md",
            expanded: "wby-pr-[52px]"
        }
    }
});

export interface AccordionContentProps
    extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>,
        VariantProps<typeof collapsiblePrimitiveVariants> {}

const AccordionContent = ({
    children,
    withIcon,
    withHandle,
    padding,
    ...props
}: AccordionContentProps) => {
    return (
        <CollapsiblePrimitive.Content
            {...props}
            className={cn(
                collapsiblePrimitiveVariants({ withHandle, withIcon, padding }),
                props.className
            )}
        >
            <div className={contentDivVariants({ padding })}>{children}</div>
        </CollapsiblePrimitive.Content>
    );
};

export { AccordionContent };
