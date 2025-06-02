module.exports = class TailwindSuppressor {
    twMessages = ["Source path:", "Setting up new context", "Active contexts", "Potential classes"];
    originalLog = console.log;
    originalTime = console.time;
    originalTimeEnd = console.timeEnd;

    enable() {
        const twMessages = this.twMessages;

        console.time = () => {
            return;
        };

        console.timeEnd = () => {
            return;
        };

        console.log = (message, ...args) => {
            if (!message) {
                this.originalLog.call(console);
                return;
            }

            for (const prefix of twMessages) {
                if (message.includes(prefix) || message.replace(/\\n/, "").trim() === "") {
                    return;
                }
            }

            this.originalLog.call(console, message, ...args);
        };
    }

    disable() {
        console.log = this.originalLog;
        console.time = this.originalTime;
        console.timeEnd = this.originalTimeEnd;
    }
};
