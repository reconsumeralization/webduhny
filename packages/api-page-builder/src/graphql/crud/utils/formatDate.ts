/**
 * Should not be used by users as method is prone to breaking changes.
 * @internal
 */
export const formatDate = (date?: Date | string | null): string | null => {
    if (!date) {
        return null;
    } else if (date instanceof Date) {
        return date.toISOString();
    }
    return new Date(date).toISOString();
};
