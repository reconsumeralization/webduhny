import * as React from "react";
import { cva, type VariantProps, cn, makeDecoratable, withStaticProps } from "~/utils";
import { Button, type ButtonProps, IconButton } from "~/Button";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as WarningIcon } from "@material-design-icons/svg/outlined/warning_amber.svg";
import { ReactComponent as SuccessIcon } from "@material-design-icons/svg/outlined/check_circle.svg";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { Icon } from "~/Icon";

const VARIANT_ICON_MAP = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: InfoIcon,
    danger: WarningIcon
};

const variants = {
    type: { info: "", success: "", warning: "", danger: "" },
    variant: { strong: "", subtle: "" }
};

const DEFAULT_TYPE = "info";
const DEFAULT_VARIANT = "subtle";

const defaultVariants = {
    type: DEFAULT_TYPE,
    variant: DEFAULT_VARIANT
} as const;

const alertVariants = cva(
    "wby-flex wby-gap-sm-plus wby-items-start wby-w-full wby-rounded-lg wby-text-md wby-py-sm-extra wby-pl-md wby-pr-sm-plus [&_a]:wby-font-semibold [&_a]:wby-underline",
    {
        variants,
        defaultVariants,
        compoundVariants: [
            {
                type: "info",
                variant: "strong",
                className: "wby-bg-neutral-dark wby-text-neutral-light [&_a]:!wby-text-neutral-light"
            },
            {
                type: "info",
                variant: "subtle",
                className: "wby-bg-neutral-dimmed wby-text-neutral-primary [&_a]:!wby-text-neutral-primary"
            },
            {
                type: "success",
                variant: "strong",
                className: "wby-bg-secondary-default wby-text-neutral-light [&_a]:!wby-text-neutral-light"
            },
            {
                type: "success",
                variant: "subtle",
                className: "wby-bg-success-subtle wby-text-neutral-primary [&_a]:!wby-text-neutral-primary"
            },
            {
                type: "warning",
                variant: "strong",
                className: "wby-bg-warning-default wby-text-neutral-primary [&_a]:!wby-text-neutral-primary"
            },
            {
                type: "warning",
                variant: "subtle",
                className: "wby-bg-warning-subtle wby-text-neutral-primary [&_a]:!wby-text-neutral-primary"
            },
            {
                type: "danger",
                variant: "strong",
                className: "wby-bg-destructive-default wby-text-neutral-light [&_a]:!wby-text-neutral-light"
            },
            {
                type: "danger",
                variant: "subtle",
                className: "wby-bg-destructive-subtle wby-text-neutral-primary [&_a]:!wby-text-neutral-primary"
            }
        ]
    }
);

const alertIconVariants = cva("wby-size-md", {
    variants,
    defaultVariants,
    compoundVariants: [
        { type: "info", variant: "strong", className: "wby-fill-neutral-base" },
        { type: "info", variant: "subtle", className: "wby-fill-neutral-xstrong" },
        { type: "success", variant: "strong", className: "wby-fill-neutral-base" },
        { type: "success", variant: "subtle", className: "wby-fill-success" },
        { type: "warning", variant: "strong", className: "wby-fill-neutral-xstrong" },
        { type: "warning", variant: "subtle", className: "wby-fill-warning" },
        { type: "danger", variant: "strong", className: "wby-fill-neutral-base" },
        { type: "danger", variant: "subtle", className: "wby-fill-destructive" }
    ]
});

const closeButtonVariants = (props: Parameters<typeof alertVariants>[0] = {}) => {
    const { type = DEFAULT_TYPE, variant = DEFAULT_VARIANT } = props;
    if (variant === "subtle") {
        return "ghost";
    }

    if (type === "warning") {
        return "ghost";
    }

    return "ghost-negative";
};

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    showCloseButton?: boolean;
    onClose?: () => void;
    actions?: React.ReactElement<typeof AlertAction>;
}

const AlertContext = React.createContext<Pick<AlertProps, "variant">>({});

const AlertActionBase = React.forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {
    const { variant: alertVariant } = React.useContext(AlertContext);
    return (
        <Button
            text={"Button"}
            variant={alertVariant === "strong" ? "secondary" : "tertiary"}
            size={"sm"}
            ref={ref}
            {...props}
        />
    );
});

AlertActionBase.displayName = "AlertAction";

const AlertAction = makeDecoratable("AlertAction", AlertActionBase);

const AlertBase = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, type, variant, showCloseButton, onClose, actions, children, ...props }, ref) => {
        const IconComponent = VARIANT_ICON_MAP[type || "info"];

        return (
            <AlertContext.Provider value={{ variant }}>
                <div
                    ref={ref}
                    role="alert"
                    className={cn(alertVariants({ type, variant }), className)}
                    {...props}
                >
                    <div className={"wby-py-xs"}>
                        <IconComponent className={alertIconVariants({ type, variant })} />
                    </div>
                    <div className={"wby-flex-grow wby-py-xxs"}>{children}</div>
                    {actions && <div>{actions}</div>}
                    {showCloseButton && (
                        <IconButton
                            onClick={onClose}
                            icon={<Icon icon={<XIcon />} label="Close" />}
                            size={"sm"}
                            variant={closeButtonVariants({ type, variant })}
                        />
                    )}
                </div>
            </AlertContext.Provider>
        );
    }
);

AlertBase.displayName = "Alert";

const DecoratableAvatar = makeDecoratable("AlertBase", AlertBase);

const Alert = withStaticProps(DecoratableAvatar, {
    Action: AlertAction
});

export { Alert };
