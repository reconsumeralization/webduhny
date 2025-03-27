import { GenericRecord } from "@webiny/cli/types";

const context = {
    api: {
        createFile(file: string, tags: string[]) {
            console.log("Create file", file, tags);
        },
        updateFile(file: string, enabled: boolean) {
            console.log("Update file", file, enabled);
        }
    }
};

type Decorators<TDecoratee> = {
    [K in keyof TDecoratee]?: (decoratee: TDecoratee[K]) => TDecoratee[K];
};

const decorateContext = <T extends GenericRecord<string, CallableFunction>>(
    decoratee: T,
    decorators: Decorators<T>
) => {
    return Object.keys(decorators).reduce((decoratee, key) => {
        const decoratedMethod = decoratee[key];

        return {
            ...decoratee,
            [key]: (...args: any[]) => {
                // @ts-expect-error
                return decorators[key](decoratedMethod)(...args);
            }
        };
    }, decoratee);
};

context.api = decorateContext(context.api, {
    createFile: decoratee => (file, tags) => {
        return decoratee(file, [...tags, "thread-scan:in-progress"]);
    }
});

context.api = decorateContext(context.api, {
    createFile: decoratee => (file, tags) => {
        return decoratee(file, [...tags, "another-tag"]);
    }
});

context.api.createFile("file1", []);
