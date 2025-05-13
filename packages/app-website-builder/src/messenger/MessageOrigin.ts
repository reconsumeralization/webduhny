// iframe-sdk/message-origin.ts
export class MessageOrigin {
    constructor(
        public window: Window,
        public origin: string
    ) {}

    matches(event: MessageEvent): boolean {
        return event.source === this.window && event.origin === this.origin;
    }
}
