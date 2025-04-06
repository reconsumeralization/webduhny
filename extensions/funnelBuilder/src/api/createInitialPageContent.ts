import {getRandomId} from "../shared/getRandomId";

export const createInitialPageContent = () => {
    return {
        id: "vIeNfaD3FI",
        type: "document",
        data: {},
        elements: [
            {
                id: "BIzNgrNqV2",
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
                        id: "pniXFJnr0Q",
                        type: "funnel-builder-main",
                        data: {},
                        elements: [
                            {
                                id: "BgNdkkgigz",
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
                                        path: ["BIzNgrNqV2", "pniXFJnr0Q", "BgNdkkgigz"]
                                    }
                                ],
                                path: ["BIzNgrNqV2", "pniXFJnr0Q"]
                            }
                        ],
                        path: ["BIzNgrNqV2"]
                    }
                ],
                path: []
            }
        ],
        path: []
    };
};
