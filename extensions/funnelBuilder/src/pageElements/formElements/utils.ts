export const createInitialElementData = (extra: Record<string, any> = {}) => ({
    field: {
        fieldId: Math.random().toString(36).substr(2, 7), // Random field ID.
        label: "",
        helpText: "",
        validators: [],
        extra
    }
});
