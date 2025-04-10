import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarIcon } from "./components/SidebarIcon";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarMenuItem } from "./components/items/SidebarMenuItem";
import { SidebarMenuLink } from "./components/items/SidebarMenuLink";
import { SidebarMenuRoot } from "./components/items/SidebarMenuRoot";
import { SidebarMenuGroup } from "~/Sidebar/components/items/SidebarMenuGroup";

interface SidebarProps
    extends Omit<React.ComponentPropsWithoutRef<typeof SidebarRoot>, "title">,
        Omit<React.ComponentPropsWithoutRef<typeof SidebarContent>, "title"> {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const SidebarBase = (props: SidebarProps) => {
    const { headerProps, rootProps, footerProps, contentProps } = React.useMemo(() => {
        const {
            // Header props.
            title,
            icon,

            // Root props.
            side,

            // Footer props.
            footer,

            // Content props.
            ...rest
        } = props;

        return {
            headerProps: {
                title,
                icon
            },
            rootProps: {
                side
            },
            footerProps: {
                footer
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <SidebarRoot {...rootProps}>
            <SidebarHeader {...headerProps} />
            <SidebarContent {...contentProps}>
                <SidebarMenuRoot>{props.children}</SidebarMenuRoot>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuRoot>{footerProps.footer}</SidebarMenuRoot>
            </SidebarFooter>
        </SidebarRoot>
    );
};

const DecoratableSidebar = makeDecoratable("Sidebar", SidebarBase);

const Sidebar = withStaticProps(DecoratableSidebar, {
    Item: SidebarMenuItem,
    Link: SidebarMenuLink,
    Group: SidebarMenuGroup,
    Icon: SidebarIcon
});

export { Sidebar };
