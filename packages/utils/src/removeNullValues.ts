type WithoutNullableKeys<Type> = {
    [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
};

export const removeNullValues = <T extends Record<string, any>>(target: T): T => {
    const result = {} as T;
    Object.keys(target).forEach(key => {
        const value = target[key];
        if (value === null) return;
        // Recursively clean nested objects
        result[key as keyof T] = (value && typeof value === "object" && !Array.isArray(value))
            ? removeNullValues(value)
            : value;
    });
    return result;
};
