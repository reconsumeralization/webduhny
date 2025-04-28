import { getRandomId } from "./getRandomId";
import { createElementType } from "./constants";
import { FunnelStepModelDto } from "./models/FunnelStepModel";

export const createStepElement = (initialStepData?: FunnelStepModelDto) => {
    return {
        id: getRandomId(),
        type: createElementType("step"),
        parent: undefined,
        data: {
            settings: {},
            step: initialStepData || {
                id: getRandomId(),
                title: "New step"
            }
        },
        elements: [
            {
                id: getRandomId(),
                type: "grid",
                parent: undefined,
                data: {
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
                        horizontalAlignFlex: { desktop: "flex-start" },
                        verticalAlign: { desktop: "flex-start" }
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
            }
        ]
    };
};
