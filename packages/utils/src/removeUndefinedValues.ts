export const removeUndefinedValues = <T extends Record<string, any>>(target: T): T => {
    const result = {} as T;
    Object.keys(target).forEach(key => {
        const value = target[key];
        if (value === undefined) return;
        // Recursively clean nested objects
        result[key as keyof T] = (value && typeof value === "object" && !Array.isArray(value))
            ? removeUndefinedValues(value)
            : value;
    });
    return result;
};
