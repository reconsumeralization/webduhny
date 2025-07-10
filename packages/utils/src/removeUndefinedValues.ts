export const removeUndefinedValues = <T extends Record<string, any>>(target: T): T => {
    const result: Record<string, any> = {};
    Object.keys(target).forEach(key => {
        const value = target[key];
        if (value === undefined) return;
        result[key] = (value && typeof value === "object" && !Array.isArray(value))
            ? removeUndefinedValues(value)
            : value;
    });
    return result as T;
};
