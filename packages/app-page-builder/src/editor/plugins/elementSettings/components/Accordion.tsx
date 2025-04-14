import React, { ReactElement } from "react";
import { Accordion as AdminUiAccordion, IconProps } from "@webiny/admin-ui";

export interface AccordionProps {
    title: string;
    children: ReactElement;
    action?: ReactElement;
    icon?: ReactElement;
    className?: string;
}

const AccordionBase = React.memo(({ title, children, action, icon, className }: AccordionProps) => {
    return (
        <AdminUiAccordion variant={"container"} background={"light"} className={"wby-mb-sm"}>
            <AdminUiAccordion.Item
                padding={"collapsed"}
                title={title}
                icon={icon}
                actions={action}
                className={className}
            >
                {children}
            </AdminUiAccordion.Item>
        </AdminUiAccordion>
    );
});

AccordionBase.displayName = "Accordion";

const AccordionIcon = (props: IconProps) => {
    return <AdminUiAccordion.Item.Icon {...props} />;
};

const Accordion = Object.assign(AccordionBase, {
    Icon: AccordionIcon
});

export default Accordion;
