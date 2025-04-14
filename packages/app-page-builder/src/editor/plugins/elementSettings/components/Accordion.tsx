import React, { ReactElement } from "react";
import { Accordion as AdminUiAccordion, IconProps } from "@webiny/admin-ui";


export interface AccordionProps {
    title: string;
    children: ReactElement;
    action?: ReactElement;
    icon?: ReactElement;
    defaultValue?: boolean;
    className?: string;
}

const AccordionBase = React.memo(
    ({ title, children, action, icon, defaultValue = false, className }: AccordionProps) => {
        return (
            <AdminUiAccordion>
                <AdminUiAccordion.Item
                    title={title}
                    icon={icon}
                    actions={action}
                    className={className}
                >
                    {children}
                </AdminUiAccordion.Item>
            </AdminUiAccordion>
        );

        // const [isOpen, setOpen] = useState(defaultValue);
        // const toggleOpen = useCallback(() => setOpen(!isOpen), [isOpen]);
        //
        // return (
        //     <div className={classNames(classes.accordionWrapper, className)}>
        //         <div
        //             className={classNames(classes.accordionHeader, { open: isOpen })}
        //             onClick={toggleOpen}
        //         >
        //             <div className="accordion-header--left">
        //                 <div className={"accordion-title"}>
        //                     <Typography use={"subtitle1"} tag={"span"}>
        //                         {title}
        //                     </Typography>
        //                 </div>
        //             </div>
        //             <div className="accordion-header--right">
        //                 <div className={"action-container"}>{action}</div>
        //                 <div className={"icon-container"}>{icon}</div>
        //             </div>
        //         </div>
        //         <div
        //             className={classNames(classes.accordionItem, { collapsed: !isOpen, open: isOpen })}
        //         >
        //             <div className="accordion-content">{children}</div>
        //         </div>
        //     </div>
        // );
    }
);

const AccordionIcon = (props: IconProps) => {
    return <AdminUiAccordion.Item.Icon {...props} />;
};

const Accordion = Object.assign(AccordionBase, {
    Icon: AccordionIcon
});

export default Accordion;
