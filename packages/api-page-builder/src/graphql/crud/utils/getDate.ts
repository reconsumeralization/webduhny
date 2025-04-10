import { formatDate } from "./formatDate";

export const getDate = <T extends string | null = string | null>(
    input?: Date | string | null,
    defaultValue?: Date | string | null
): T => {
    if (!input) {
        return formatDate(defaultValue) as T;
    }
    if (input instanceof Date) {
        return formatDate(input) as T;
    }
    return formatDate(new Date(input)) as T;
};
