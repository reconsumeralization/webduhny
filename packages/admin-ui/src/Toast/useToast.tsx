import * as React from "react";
import { toast as sonnerToast, type ToasterProps as SonnerToasterProps } from "sonner";
import { ToastActions, ToastDescription, ToastTitle, type ToastRootProps } from "./components";
import { Toast } from "./Toast";
import { Icon } from "~/Icon";
import { generateId } from "~/utils";

type ShowToastParams = {
    title: React.ReactElement<typeof ToastTitle> | string;
    description?: React.ReactElement<typeof ToastDescription> | string;
    icon?: React.ReactElement<typeof Icon>;
    actions?: React.ReactElement<typeof ToastActions>;
    dismissible?: boolean;
    duration?: number;
    position?: SonnerToasterProps["position"];
    variant?: ToastRootProps["variant"];
};

const useToast = () => {
    const getTitle = React.useCallback((title: React.ReactElement<typeof ToastTitle> | string) => {
        return typeof title === "string" ? <ToastTitle text={title} /> : title;
    }, []);

    const getDescription = React.useCallback(
        (description: React.ReactElement<typeof ToastDescription> | string | undefined) => {
            return typeof description === "string" ? (
                <ToastDescription text={description} />
            ) : (
                description
            );
        },
        []
    );

    const showToast = React.useCallback(
        (params: ShowToastParams) => {
            const {
                title,
                description,
                icon,
                actions,
                variant,
                dismissible,
                duration = 6000,
                position = "top-right"
            } = params;

            const id = generateId();

            return sonnerToast.custom(
                toast => (
                    <Toast
                        title={getTitle(title)}
                        description={getDescription(description)}
                        icon={icon}
                        actions={actions}
                        variant={variant}
                        onCloseClick={() => sonnerToast.dismiss(toast)}
                        dismissible={dismissible}
                    />
                ),
                {
                    id,
                    duration,
                    dismissible,
                    position
                }
            );
        },
        [getTitle, getDescription, sonnerToast]
    );

    const hideToast = React.useCallback(
        (id: number | string) => {
            return sonnerToast.dismiss(id);
        },
        [sonnerToast]
    );

    const hideAllToasts = React.useCallback(() => {
        const toastIds = sonnerToast.getToasts().map(toast => toast.id);

        if (toastIds.length === 0) {
            return;
        }

        // Dismiss each toast with a small delay between them
        // This helps ensure each dismissal is processed properly
        toastIds.forEach((id, index) => {
            setTimeout(() => {
                sonnerToast.dismiss(id);
            }, index * 50);
        });
    }, [sonnerToast]);

    return React.useMemo(
        () => ({
            showToast,
            hideToast,
            hideAllToasts
        }),
        [showToast, hideToast, hideAllToasts]
    );
};

export { useToast, type ShowToastParams };
