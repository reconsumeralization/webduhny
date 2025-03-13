import * as React from "react";
import { ReactComponent as KeyboardArrowDownIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "~/utils";
import { type AccordionItemProps } from "./AccordionItem";
import { AccordionItemAction } from "./AccordionItemAction";
import { Icon } from "~/Icon";

type AccordionTriggerProps = Pick<
    AccordionItemProps,
    "title" | "description" | "icon" | "handle" | "actions"
>;

const AccordionTrigger = ({ title, description, actions, icon, handle }: AccordionTriggerProps) => {
    // The following three attributes are required for the trigger to act as a button.
    // We can't use the default button element here because the content of the trigger
    // can also contain one or more buttons.
    const divAsButtonProps = React.useMemo<React.HTMLAttributes<HTMLDivElement>>(() => {
        return {
            role: "button",
            tabIndex: 0,
            onKeyDown: e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
        };
    }, []);

    return (
        <AccordionPrimitive.Trigger asChild>
            <div
                {...divAsButtonProps}
                className={cn(
                    "wby-w-full wby-flex wby-items-center wby-cursor-pointer",
                    "focus-visible:wby-outline-none focus-visible:wby-border-none focus-visible:wby-ring-sm focus-visible:wby-ring-primary-dimmed",
                    "hover:wby-bg-neutral-dimmed",
                    "group-[.wby-accordion-variant-container]:wby-rounded-lg",
                    "[&[data-state=open]_[data-role=open-close-indicator]]:wby-rotate-180"
                )}
            >
                {handle}
                <div
                    className={
                        "wby-w-full wby-flex wby-justify-between wby-items-center wby-px-md wby-py-sm-extra"
                    }
                >
                    {icon && <div className={"wby-mr-md"}>{icon}</div>}
                    <div
                        className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow wby-text-left"}
                    >
                        <div className={"wby-text-md wby-font-semibold"}>{title}</div>
                        <div className={"wby-text-sm wby-text-neutral-strong"}>{description}</div>
                    </div>
                    <div className={"wby-flex wby-ml-3xl wby-gap-xs"}>
                        {actions}

                        {/* No need to show the separator if there are no actions. */}
                        {actions && <AccordionItemAction.Separator />}

                        <Icon
                            size={"lg"}
                            className={"wby-transition"}
                            color={"neutral-strong"}
                            data-role={"open-close-indicator"}
                            label={"Open/close indicator"}
                            icon={<KeyboardArrowDownIcon />}
                        />
                    </div>
                </div>
            </div>
        </AccordionPrimitive.Trigger>
    );
};

export { AccordionTrigger };
