import { join } from "path";
import notifier from "node-notifier";

export interface INotifyParams {
    message: string;
    timeout?: number;
}

export const notify = ({ message, timeout }: INotifyParams) => {
    return new Promise(resolve => {
        notifier.notify({
            title: "Webiny CLI",
            message,
            icon: join(__dirname, "logo.png"),
            sound: false,
            timeout: timeout === undefined ? 1 : timeout
        });

        setTimeout(resolve, 100);
    }).catch(() => {
        // Suppress any unexpected promise rejections to ensure smooth user experience.
        // Notification errors are non-critical and can be safely ignored.
    });
};
