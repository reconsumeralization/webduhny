import { join } from "path";
import notifier from "node-notifier";

export interface INotifyParams {
    message: string;
}
export const notify = ({ message }: INotifyParams) => {
    return new Promise(resolve => {
        notifier.notify({
            title: "Webiny CLI",
            message,
            icon: join(__dirname, "logo.png"),
            sound: false,
            timeout: 1
        });

        setTimeout(resolve, 100);
    });
};
