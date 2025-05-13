export type ElementNode = {
    id: string;
    type: string;
    children?: string[];
    component?: {
        name: string;
        options?: Record<string, any>;
    };
    source?: string;
    inputs?: any[];
};

export type ElementMap = Record<string, ElementNode>;

export type Document = {
    properties: Record<string, any>;
    elements: ElementMap;
};
