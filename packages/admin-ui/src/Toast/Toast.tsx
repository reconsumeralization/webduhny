import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { makeDecoratable, withStaticProps } from "~/utils";
import { Icon as BaseIcon } from "~/Icon";
import {
    ToastRoot,
    ToastViewport,
    ToastTitle,
    ToastActions,
    ToastDescription,
    ToastClose,
    ToastIcon
} from "./components";

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastRoot>;

interface ToastProps extends Omit<ToastRootProps, "title" | "content" | "children"> {
    title: React.ReactElement<typeof ToastTitle>;
    description?: React.ReactElement<typeof ToastDescription>;
    icon?: React.ReactElement<typeof BaseIcon>;
    actions?: React.ReactElement<typeof ToastActions>;
    dismissible?: boolean;
}

const DecoratableToast = ({
    title,
    description,
    icon,
    actions,
    duration = 6000,
    dismissible = true,
    ...props
}: ToastProps) => {
    return (
        <ToastRoot
            hasDescription={!!description || !!actions}
            duration={dismissible ? duration : 999999}
            {...props}
        >
            <ToastIcon icon={icon} />
            <div className="wby-w-64">
                {title}
                {description && description}
                {actions && actions}
            </div>
            <ToastClose variant={props.variant} />
        </ToastRoot>
    );
};

const Toast = withStaticProps(makeDecoratable("Toast", DecoratableToast), {
    Title: ToastTitle,
    Description: ToastDescription,
    Actions: ToastActions,
    Provider: ToastPrimitives.Provider,
    Viewport: ToastViewport
});

export { Toast };
