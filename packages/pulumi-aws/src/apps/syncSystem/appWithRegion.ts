import type { PulumiApp } from "@webiny/pulumi";
import type { IRegionProvider } from "./types.js";

export interface IAppWithRegionParams {
    app: PulumiApp;
    region: IRegionProvider;
    protect?: boolean;
}

export const appWithRegion = (params: IAppWithRegionParams) => {
    const { app, region, protect } = params;

    const initialAddResource = app.addResource;

    app.addResource = (resource, params) => {
        return initialAddResource(resource, {
            ...params,
            opts: {
                provider: region.provider,
                protect,
                ...params.opts
            }
        });
    };

    return app;
};
