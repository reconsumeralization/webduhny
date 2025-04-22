const { join } = require("path");
const notifier = require("node-notifier");

module.exports = ({ message }) => {
    return new Promise(resolve => {
        notifier.notify({
            title: "Webiny CLI",
            message,
            icon: join(__dirname, "logo.png"),
            sound: false,
            timeout: 1
        });

        setTimeout(resolve, 100);
    }).catch(() => {
        // Suppress any unexpected promise rejections to ensure smooth user experience.
        // Notification errors are non-critical and can be safely ignored.
    });
};
