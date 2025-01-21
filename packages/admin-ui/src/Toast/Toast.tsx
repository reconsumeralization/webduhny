import * as React from "react";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";
import { ReactComponent as NotificationsIconActive } from "@material-design-icons/svg/outlined/notifications_active.svg";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { Heading } from "~/Heading";
import { Text } from "~/Text";
import { Icon, IconProps } from "~/Icon";
import { IconButton } from "~/Button";

const ToastProvider = ToastPrimitives.Provider;

/**
 * Toast Viewport
 */
const DecoratableToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "wby-fixed wby-top-0 wby-right-0 wby-bottom-auto wby-z-[100] wby-flex wby-max-h-screen wby-flex-col wby-p-4",
            className
        )}
        {...props}
    />
));
DecoratableToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const ToastViewport = makeDecoratable("ToastViewport", DecoratableToastViewport);

/**
 * Toast Root
 */
const toastVariants = cva(
    [
        "wby-group wby-pointer-events-auto wby-relative wby-flex wby-w-full wby-items-center wby-justify-start wby-p-md wby-gap-sm-extra wby-self-stretch wby-overflow-hidden wby-rounded-md wby-border-sm wby-border-neutral-dimmed wby-shadow-lg wby-transition-all",
        "wby-data-[swipe=cancel]:translate-x-0 wby-data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] wby-data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] wby-data-[swipe=move]:transition-none wby-data-[state=open]:animate-in wby-data-[state=closed]:animate-out wby-data-[swipe=end]:animate-out wby-data-[state=closed]:fade-out-80 wby-data-[state=closed]:slide-out-to-right-full wby-data-[state=open]:slide-in-from-top-full"
    ],
    {
        variants: {
            variant: {
                default: "wby-default-variant wby-bg-neutral-dark",
                subtle: "wby-subtle-variant wby-bg-white"
            },
            hasDescription: {
                true: "wby-has-description wby-items-start wby-justify-start"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

const DecoratableToastRoot = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, hasDescription, variant, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant, hasDescription }), className)}
            {...props}
        />
    );
});
DecoratableToastRoot.displayName = ToastPrimitives.Root.displayName;

const ToastRoot = makeDecoratable("ToastRoot", DecoratableToastRoot);

/**
 * Toast Actions
 */
const DecoratableToastActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
    <div {...props} className={"wby-mt-md wby-flex wby-w-full wby-items-center wby-justify-start wby-gap-sm"} ref={ref}>
        {children}
    </div>
));
DecoratableToastActions.displayName = "ToastActions";

const ToastActions = makeDecoratable("ToastActions", DecoratableToastActions);

/**
 * Toast Close Icon
 */

interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {
    variant?: VariantProps<typeof toastVariants>["variant"];
}

const DecoratableToastClose = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Close>,
    ToastCloseProps
>(({ variant, ...props }, ref) => (
    <ToastPrimitives.Close ref={ref} {...props} asChild>
        <IconButton
            icon={<Icon label={"Close"} icon={<CloseIcon />} />}
            size={"sm"}
            iconSize={"lg"}
            variant={variant === "subtle" ? "ghost" : "ghost-negative"}
        />
    </ToastPrimitives.Close>
));
DecoratableToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastClose = makeDecoratable("ToastClose", DecoratableToastClose);

/**
 * Toast Icon
 */
type ToastIconProps = {
    icon?: React.ReactElement<IconProps>;
};

const DecoratableNotificationIcon = () => (
    <Icon icon={<NotificationsIconActive />} label={"Notification"} aria-hidden={true} />
);

const NotificationIcon = makeDecoratable("NotificationIcon", DecoratableNotificationIcon);

const DecoratableToastIcon = ({ icon = <NotificationIcon /> }: ToastIconProps) => (
    <div className={"wby-fill-accent-default"}>
        <span className="wby-h-3 wby-w-3">{icon}</span>
    </div>
);

const ToastIcon = makeDecoratable("ToastIcon", DecoratableToastIcon);

/**
 * Toast Title
 */
type ToastTitleProps = Omit<ToastPrimitives.ToastTitleProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Title>,
    ToastTitleProps
>(({ text, className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        {...props}
        asChild
        className={cn(
            "wby-group-[.default-variant]:text-neutral-light wby-group-[.subtle-variant]:text-neutral-primary wby-font-normal wby-group-[.has-description]:font-semibold",
            className
        )}
    >
        <Heading level={6} text={text} />
    </ToastPrimitives.Title>
));
DecoratableToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastTitle = makeDecoratable("ToastTitle", DecoratableToastTitle);

/**
 * Toast Description
 */
type ToastDescriptionProps = Omit<ToastPrimitives.ToastDescriptionProps, "children"> & {
    text: React.ReactNode;
};

const DecoratableToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Description>,
    ToastDescriptionProps
>(({ text, className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        {...props}
        asChild
        className={cn(
            "wby-mt-xs-plus wby-group-[.default-variant]:text-neutral-dimmed wby-group-[.subtle-variant]:text-neutral-strong",
            className
        )}
    >
        <Text text={text} as={"div"} size={"md"} className={"wby-text-neutral-dimmed"} />
    </ToastPrimitives.Description>
));
DecoratableToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastDescription = makeDecoratable("ToastDescription", DecoratableToastDescription);

/**
 * Toast
 */
type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastRoot>;

interface ToastProps extends Omit<ToastRootProps, "title" | "content" | "children"> {
    title: React.ReactElement<ToastTitleProps>;
    description?: React.ReactElement<ToastDescriptionProps>;
    icon?: React.ReactElement<IconProps>;
    actions?: React.ReactElement<typeof ToastActions>;
}

const DecoratableToast = ({ title, description, icon, actions, ...props }: ToastProps) => {
    return (
        <ToastRoot hasDescription={!!description || !!actions} {...props}>
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
    Provider: ToastProvider,
    Viewport: ToastViewport
});

export { Toast, type ToastRootProps, type ToastProps };
