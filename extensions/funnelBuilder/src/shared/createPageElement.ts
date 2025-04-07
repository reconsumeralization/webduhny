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
        type: "grid",
        parent: undefined,
        data: {
            fub: {
                page: { id: getRandomId(), title: params.title }
            },
            settings: {
                width: {
                    desktop: {
                        value: "1100px"
                    }
                },
                margin: {
                    desktop: {
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        left: "0px",
                        advanced: true
                    }
                },
                padding: {
                    desktop: {
                        all: "10px"
                    }
                },
                grid: {
                    cellsType: "12"
                },
                gridSettings: {
                    desktop: {
                        flexDirection: "row"
                    },
                    "mobile-landscape": {
                        flexDirection: "column"
                    }
                },
                horizontalAlignFlex: {
                    desktop: "flex-start"
                },
                verticalAlign: {
                    desktop: "flex-start"
                }
            }
        },
        elements: [
            {
                id: getRandomId(),
                type: "cell",
                parent: undefined,
                data: {
                    settings: {
                        margin: {
                            desktop: {
                                top: "0px",
                                right: "0px",
                                bottom: "0px",
                                left: "0px",
                                advanced: true
                            }
                        },
                        padding: {
                            desktop: {
                                all: "0px"
                            }
                        },
                        grid: { size: 12 },
                        horizontalAlignFlex: { desktop: "flex-start" }
                    }
                },
                elements: []
            }
        ]
    };
};
