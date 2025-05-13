import micromatch from "micromatch";
import pino from "pino";
import { MessageOrigin } from "./MessageOrigin.js";

const logger = pino({
    name: "Messenger",
    level: "debug"
});

export type Message<T = any> = {
    type: string;
    payload: T;
};

type Handler<T = any> = (payload: T, logicalType: string) => void;

export class Messenger {
    private listeners = new Map<string, Set<Handler>>();
    private readonly pattern: string;
    private readonly prefixGlob: string;

    constructor(
        private source: MessageOrigin,
        private target: MessageOrigin,
        pattern: string // e.g. "preview.*"
    ) {
        this.pattern = pattern;
        this.prefixGlob = pattern.replace(/\*+$/, "");
        this.handleMessage = this.handleMessage.bind(this);
        this.source.window.addEventListener("message", this.handleMessage);
    }

    private handleMessage(event: MessageEvent) {
        const { type, payload } = event.data || {};
        if (!this.target.matches(event)) return;
        if (!type || !micromatch.isMatch(type, this.pattern)) return;

        const logicalType = this.stripPrefix(type);

        logger.debug(`--> [${this.source.origin}][${logicalType}]`, { type, payload });

        const handlers = this.listeners.get(logicalType);
        if (handlers) {
            handlers.forEach(fn => fn(payload, logicalType));
        }
    }

    private stripPrefix(fullType: string): string {
        return fullType.startsWith(this.prefixGlob)
            ? fullType.slice(this.prefixGlob.length)
            : fullType;
    }

    on<T = any>(logicalType: string, handler: Handler<T>) {
        if (!this.listeners.has(logicalType)) {
            this.listeners.set(logicalType, new Set());
        }
        this.listeners.get(logicalType)!.add(handler);
        return () => this.listeners.get(logicalType)!.delete(handler);
    }

    send<T = any>(logicalType: string, payload: T) {
        const fullType = this.prefixGlob + logicalType;

        logger.debug(`<-- [${this.source.origin}][${logicalType}]`, { type: fullType, payload });

        this.target.window.postMessage({ type: fullType, payload }, this.target.origin);
    }

    dispose() {
        this.source.window.removeEventListener("message", this.handleMessage);
        this.listeners.clear();
    }
}
