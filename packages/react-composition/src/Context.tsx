import React, {
    ComponentType,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useCompositionScope } from "~/CompositionScope";
import {
    ComposedFunction,
    ComposeWith,
    Decoratable,
    DecoratableComponent,
    DecoratableHook,
    Decorator,
    Enumerable,
    GenericComponent,
    GenericHook
} from "~/types";

export function compose<T>(...fns: Decorator<T>[]) {
    return (decoratee: T): T => {
        return fns.reduceRight((decoratee, decorator) => decorator(decoratee), decoratee) as T;
    };
}

interface ComposedComponent {
    /**
     * Ready to use React component.
     */
    component: GenericHook | GenericComponent;
    /**
     * HOCs used to compose the original component.
     */
    hocs: Decorator<GenericComponent | GenericHook>[];
    /**
     * Component composition can be scoped.
     */
    scope?: string;
}

/**
 * @deprecated Use `Decorator` instead.
 */
export interface HigherOrderComponent<TProps = any, TOutput = TProps> {
    (Component: GenericComponent<TProps>): GenericComponent<TOutput>;
}

type ComposedComponents = Map<ComponentType<unknown>, ComposedComponent>;
type ComponentScopes = Map<string, ComposedComponents>;

export type DecoratableTypes = DecoratableComponent | DecoratableHook;

interface CompositionContextGetComponentCallable {
    (component: ComponentType<unknown>, scope: string[]):
        | ComposedFunction
        | GenericComponent
        | undefined;
}

interface CompositionContext {
    components: ComponentScopes;
    getComponent: CompositionContextGetComponentCallable;
    composeComponent(
        component: ComponentType<unknown>,
        hocs: Enumerable<ComposeWith>,
        scope?: string[]
    ): void;
}

const CompositionContext = createContext<CompositionContext | undefined>(undefined);

export type DecoratorsTuple = [Decoratable, Decorator<any>[]];
export type DecoratorsCollection = Array<DecoratorsTuple>;

interface CompositionProviderProps {
    decorators?: DecoratorsCollection;
    children: React.ReactNode;
}

const getCacheKey = (scopes: string[]) => {
    return scopes.join(";");
};

/**
 * Scopes are ordered in reverse, to go from child to parent. As we iterate over scopes, we try to find the latest component
 * recipe (a "recipe" is a base component + all decorators registered so far). If none exist, we return an empty recipe.
 */
const findComponentRecipe = (
    component: GenericComponent | GenericHook,
    lookupScopes: string[],
    components: ComponentScopes
) => {
    for (let i = lookupScopes.length; i > 0; i--) {
        const cacheKey = getCacheKey(lookupScopes.slice(0, i));
        const scopeMap: ComposedComponents = components.get(cacheKey) || new Map();
        const recipe = scopeMap.get(component);
        if (recipe) {
            return recipe;
        }
    }

    return { component: null, hocs: [] };
};

const composeComponents = (
    components: ComponentScopes,
    decorators: Array<[GenericComponent | GenericHook, Decorator<any>[]]>,
    scopes: string[] = []
) => {
    const cacheKey = getCacheKey(scopes);
    const targetComponents: ComposedComponents = components.get(cacheKey) || new Map();

    for (const [component, hocs] of decorators) {
        const recipe = findComponentRecipe(component, scopes, components);

        const newHocs = [...(recipe.hocs || []), ...hocs] as Decorator<
            GenericHook | GenericComponent
        >[];

        targetComponents.set(component, {
            component: compose(...[...newHocs].reverse())(component),
            hocs: newHocs
        });

        components.set(cacheKey, targetComponents);
    }

    return components;
};

export const CompositionProvider = ({ decorators = [], children }: CompositionProviderProps) => {
    const [components, setComponents] = useState<ComponentScopes>(() => {
        return composeComponents(
            new Map(),
            decorators.map(tuple => {
                return [tuple[0].original, tuple[1]];
            }),
            ["*"]
        );
    });

    const composeComponent = useCallback(
        (
            component: GenericComponent | GenericHook,
            hocs: HigherOrderComponent<any, any>[],
            scopes: string[] = []
        ) => {
            const allScopes = ["*", ...scopes];

            setComponents(prevComponents => {
                return composeComponents(new Map(prevComponents), [[component, hocs]], allScopes);
            });

            // Return a function that will remove the added HOCs.
            return () => {
                const cacheKey = getCacheKey(allScopes);
                setComponents(prevComponents => {
                    const components = new Map(prevComponents);
                    const scopeMap: ComposedComponents = components.get(cacheKey) || new Map();
                    const recipe = scopeMap.get(component) || {
                        component: null,
                        hocs: []
                    };

                    const newHOCs = [...recipe.hocs].filter(hoc => !hocs.includes(hoc));
                    const NewComponent = compose(...[...newHOCs].reverse())(component);

                    scopeMap.set(component, {
                        component: NewComponent,
                        hocs: newHOCs
                    });

                    components.set(cacheKey, scopeMap);
                    return components;
                });
            };
        },
        [setComponents]
    );

    const getComponent = useCallback<CompositionContextGetComponentCallable>(
        (Component, scope = []) => {
            const scopes = ["*", ...scope];
            for (let i = scopes.length; i > 0; i--) {
                const cacheKey = getCacheKey(scopes.slice(0, i));
                const scopeMap: ComposedComponents = components.get(cacheKey) || new Map();
                const composedComponent = scopeMap.get(Component);
                if (composedComponent) {
                    return composedComponent.component;
                }
            }

            return undefined;
        },
        [components]
    );

    const context: CompositionContext = useMemo(
        () => ({
            getComponent,
            composeComponent,
            components
        }),
        [components, composeComponent]
    );

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            // @ts-expect-error This is a developers-only utility.
            window["debug_printComposedComponents"] = () => {
                console.log(components);
            };
        }
    }, [components]);

    return <CompositionContext.Provider value={context}>{children}</CompositionContext.Provider>;
};

export function useComponent<T>(baseFunction: T) {
    const context = useOptionalComposition();
    const scope = useCompositionScope();

    if (!context) {
        return baseFunction;
    }

    return (context.getComponent(baseFunction as any, scope) || baseFunction) as T;
}

/**
 * This hook will throw an error if composition context doesn't exist.
 */
export function useComposition() {
    const context = useContext(CompositionContext);
    if (!context) {
        throw new Error(
            `You're missing a <CompositionProvider> higher up in your component hierarchy!`
        );
    }

    return context;
}

/**
 * This hook will not throw an error if composition context doesn't exist.
 */
export function useOptionalComposition() {
    return useContext(CompositionContext);
}
