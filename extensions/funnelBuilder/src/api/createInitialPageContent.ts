import { getRandomId } from "../shared/getRandomId";

const DOCUMENT_ID = "fub-document";
const BLOCK_ID = "fub-block";
const MAIN_ID = "fub-main";
const MAIN_DEFAULT_PAGE_ID = "fub-main-default-page";

export const createInitialPageContent = () => {
    return {
        id: DOCUMENT_ID,
        type: "document",
        data: {},
        elements: [
            {
                id: BLOCK_ID,
                type: "block",
                data: {
                    settings: {
                        width: {
                            desktop: {
                                value: "100%"
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
                        horizontalAlignFlex: {
                            desktop: "center"
                        },
                        verticalAlign: {
                            desktop: "flex-start"
                        }
                    }
                },
                elements: [
                    {
                        id: MAIN_ID,
                        type: "funnel-builder-main",
                        data: {},
                        elements: [
                            {
                                id: MAIN_DEFAULT_PAGE_ID,
                                type: "grid",
                                data: {
                                    fub: {
                                        page: {
                                            id: getRandomId(),
                                            title: "Page 1"
                                        }
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
                                        id: "VCU9Zx78qq",
                                        type: "cell",
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
                                                grid: {
                                                    size: 12
                                                },
                                                horizontalAlignFlex: {
                                                    desktop: "flex-start"
                                                }
                                            }
                                        },
                                        elements: [],
                                        path: [
                                            DOCUMENT_ID,
                                            BLOCK_ID,
                                            MAIN_ID,
                                            MAIN_DEFAULT_PAGE_ID,
                                        ]
                                    }
                                ],
                                path: [DOCUMENT_ID, BLOCK_ID, MAIN_ID]
                            }
                        ],
                        path: [DOCUMENT_ID, MAIN_ID]
                    }
                ],
                path: [DOCUMENT_ID]
            }
        ],
        path: []
    };
};
