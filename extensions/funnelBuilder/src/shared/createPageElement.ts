import { getRandomId } from "./getRandomId";
import { createElement } from "@webiny/app-page-builder/editor/helpers";

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
    const grid = createElement("grid");
    return {
        ...grid,
        data: {
            ...grid.data,
            fub: {
                ...grid.data.fub,
                page: {
                    id: getRandomId(),
                    title: params.title
                }
            }
        }
    }
    // return {
    //     id: getRandomId(),
    //     type: "grid",
    //     data: {
    //         fub: {
    //             page: { id: getRandomId(), title: params.title }
    //         },
    //         settings: {}
    //     },
    //     elements: [
    //         {
    //             id: "VCU9Zx78qq",
    //             type: "cell",
    //             data: {
    //                 settings: {
    //                     margin: {
    //                         desktop: {
    //                             top: "0px",
    //                             right: "0px",
    //                             bottom: "0px",
    //                             left: "0px",
    //                             advanced: true
    //                         }
    //                     },
    //                     padding: {
    //                         desktop: {
    //                             all: "0px"
    //                         }
    //                     },
    //                     grid: { size: 12 },
    //                     horizontalAlignFlex: { desktop: "flex-start" }
    //                 }
    //             },
    //             elements: []
    //         }
    //     ]
    // };
};
