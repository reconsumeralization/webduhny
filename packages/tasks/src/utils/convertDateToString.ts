export const convertDateToString = <T>(input: T): T => {
    if (input instanceof Date) {
        return input.toISOString() as unknown as T;
    }

    if (Array.isArray(input)) {
        return input.map(item => convertDateToString(item)) as unknown as T;
    }

    if (input !== null && typeof input === "object") {
        const output: Record<string, unknown> = {};
        for (const key in input) {
            const value = input[key];
            output[key] = convertDateToString(value);
        }
        return output as T;
    }

    return input;
};
