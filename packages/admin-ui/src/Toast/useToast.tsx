import * as React from "react";
import { toast as sonnerToast, type ToasterProps as SonnerToasterProps } from "sonner";
import { ToastActions, ToastDescription, ToastTitle, type ToastRootProps } from "./components";
import { Toast } from "./Toast";
import { Icon } from "~/Icon";

type UseToastParams = {
    title: React.ReactElement<typeof ToastTitle> | string;
    description?: React.ReactElement<typeof ToastDescription> | string;
    icon?: React.ReactElement<typeof Icon>;
    actions?: React.ReactElement<typeof ToastActions>;
    dismissible?: boolean;
    duration?: number;
    position?: SonnerToasterProps["position"];
    variant: ToastRootProps["variant"];
};

const useToast = (params: UseToastParams) => {
    const {
        title: paramsTitle,
        description: paramsDescription,
        icon,
        actions,
        variant,
        dismissible,
        duration = 6000,
        position = "top-right"
    } = params;

    const getTitle = (title: React.ReactElement<typeof ToastTitle> | string) => {
        if (typeof title === "string") {
            return <ToastTitle text={title} />;
        }

        return title;
    };

    const getDescription = (
        description: React.ReactElement<typeof ToastDescription> | string | undefined
    ) => {
        if (typeof description === "string") {
            return <ToastDescription text={description} />;
        }

        return description;
    };

    return sonnerToast.custom(
        toast => {
            return (
                <Toast
                    title={getTitle(paramsTitle)}
                    description={getDescription(paramsDescription)}
                    icon={icon}
                    actions={actions}
                    variant={variant}
                    onCloseClick={() => sonnerToast.dismiss(toast)}
                    dismissible={dismissible}
                />
            );
        },
        {
            duration,
            dismissible,
            position
        }
    );
};

export { useToast, type UseToastParams };
