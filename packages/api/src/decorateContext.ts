type Decorators<TDecoratee> = {
    [K in keyof TDecoratee]?: (decoratee: TDecoratee[K]) => TDecoratee[K];
};

export const decorateContext = <T extends Record<string, any>>(
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
