import { getRandomId } from "./getRandomId";

interface FubCreatePageParams {
    title: string;
}

export interface FubPageElementData {
    fub: {
        page: {
            id: string;
            title: string;
        };
    };
}

export const createPageElement = (params: FubCreatePageParams) => {
    // Pages are basically grids with a single column and a single row,
    // which users can fill with elements.
    return {
        id: getRandomId(),
        data: {
            fub: {
                page: { id: getRandomId(), title: params.title }
            },
            settings: {}
        },
        elements: [],
        type: "grid"
    };
};
