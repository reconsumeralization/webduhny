import type { IStackOutput } from "~/utils";

export interface IStack<T extends IStackOutput = IStackOutput> {
    env: string;
    variant: string | undefined;
    output?: T;
    withOutput(output: T): Required<IStack<T>>;
}

export interface IStackParams<T extends IStackOutput = IStackOutput> {
    env: string;
    variant: string | undefined;
    output?: T;
}

export class Stack<T extends IStackOutput = IStackOutput> implements IStack<T> {
    public readonly env: string;
    public readonly variant: string | undefined;
    public readonly output: T | undefined;

    public constructor(params: IStackParams<T>) {
        this.env = params.env;
        this.variant = params.variant;
        this.output = params.output ? structuredClone(params.output) : undefined;
    }

    public withOutput(output: T): Required<IStack<T>> {
        /**
         * We can safely cast as we know that the output is defined.
         */
        return new Stack<T>({
            env: this.env,
            variant: this.variant,
            output: structuredClone(output)
        }) as Required<IStack<T>>;
    }
}

export const createStack = <T extends IStackOutput = IStackOutput>(
    params: IStackParams<T>
): IStack<T> => {
    return new Stack<T>(params);
};
