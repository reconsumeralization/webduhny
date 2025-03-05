import React, { useMemo } from "react";
import { Accordion as AdminUiAccordion } from "@webiny/admin-ui";
import { withStaticProps } from "@webiny/admin-ui/utils";

export interface AccordionItemProps {
    /**
     * Element displayed when accordion is expanded.
     */
    children: React.ReactNode;

    /**
     * @deprecated This prop no longer has any effect.
     * Elevation number, default set to 2
     */
    elevation?: number;

    /**
     * Append a class name
     */
    className?: string;

    value?: string;

    title?: React.ReactNode;

    description?: React.ReactNode;

    open?: boolean;

    /**
     * @deprecated This prop no longer has any effect.
     */
    interactive?: boolean;

    handle?: React.ReactNode;

    actions?: React.ReactNode;

    icon?: React.ReactNode;

    /**
     * @deprecated This prop no longer has any effect.
     */
    iconClassName?: string;
}

const AccordionItemBase = (props: AccordionItemProps) => {
    const value = useMemo(() => {
        return props.value || new Date().toISOString();
    }, [props.value]);

    const icon = useMemo(() => {
        return props.icon ? (
            <AdminUiAccordion.Item.Icon
                icon={props.icon}
                label={typeof props.title === "string" ? props.title : ""}
            />
        ) : null;
    }, [props.icon]);

    return (
        <AdminUiAccordion.Item {...props} value={value} icon={icon} title={props.title || ""}>
            {props.children as React.ReactElement}
        </AdminUiAccordion.Item>
    );
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Accordion.Item` component from the `@webiny/admin-ui` package instead.
 */
export const AccordionItem = withStaticProps(AccordionItemBase, {
    Divider: AdminUiAccordion.Item.Action.Separator,
    Action: AdminUiAccordion.Item.Action,
    Handle: AdminUiAccordion.Item.Handle,
    Icon: AdminUiAccordion.Item.Icon,
    Actions: (props: any) => <>{props.children}</>,
    Element: (props: any) => <div data-role={"accordion-element"} {...props} />
});
