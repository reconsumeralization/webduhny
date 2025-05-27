import React from "react";
import { Button, ButtonProps } from "@webiny/admin-ui";

type CustomEventT<T> = CustomEvent<T> & React.SyntheticEvent<EventTarget>;

type SnackbarActionProps = ButtonProps & {
    /** Content specified as a label prop. */
    label?: React.ReactNode | any;
    /** An action returned in evt.detail.reason to the onClose handler. */
    action?: string;
};

type ToastActionWithDataActionProps = ButtonProps & {
    "data-action"?: string;
};

type SnackbarProps = {
    open?: boolean;
    /** A callback thats fired when the Snackbar shows. */
    onOpen?: (evt: CustomEventT<any>) => void;
    /** A callback thats fired when the Snackbar hides. evt.detail = { reason?: string } */
    onClose?: (
        evt: CustomEventT<{
            reason?: string;
        }>
    ) => void;
    /** A string or other renderable JSX to be used as the message body. */
    message?: React.ReactNode;
    /** One or more actions to add to the snackbar. */
    action?:
        | React.ReactElement<ToastActionWithDataActionProps>
        | React.ReactElement<ToastActionWithDataActionProps>[];
    /** Milliseconds to show the Snackbar for. Set to -1 to show indefinitely. */
    timeout?: number;
    /** Places the action underneath the message text. */
    stacked?: boolean;
    leading?: boolean;
    dismissIcon?: boolean | React.ReactNode;
    /** Whether or not your want clicking an action to close the Snackbar. */
    dismissesOnAction?: boolean;
    /** An icon for the snackbar */
    icon?: React.ReactNode;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `useToast` hook from the `@webiny/admin-ui` to show messages package instead.
 */
const Snackbar = ({ message }: SnackbarProps) => {
    console.warn(
        "Snackbar component has been deprecated: use the `useToast` hook from the `@webiny/admin-ui` to show messages package instead."
    );
    return <>{message}</>;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Button` component from the `@webiny/admin-ui` package instead.
 */
const SnackbarAction = ({
    label,
    action,
    onClick
}: SnackbarActionProps): React.ReactElement<ButtonProps & { "data-action"?: string }> => {
    return <Button variant={"primary"} onClick={onClick} data-action={action} text={label} />;
};

export { Snackbar, SnackbarAction };
