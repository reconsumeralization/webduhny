import {
    getStackOutput,
    type IDefaultStackOutput
} from "@webiny/cli-plugin-deploy-pulumi/utils/getStackOutput.js";

export interface IGetStacksStack {
    name: string;
    env: string;
    variant: string | undefined;
}

export interface IGetApplicationStacks {
    stacks: IGetStacksStack[];
}

const apps = ["api", "admin", "website"];

interface IPromiseResult {
    app: string;
    env: string;
    variant: string | undefined;
    name: string;
    stack: IDefaultStackOutput;
}

export interface IGetApplicationStacksResultStack {
    env: string;
    variant: string | undefined;
    api: string;
    admin: string;
    website: string | undefined;
    preview: string | undefined;
}

export interface IGetApplicationStacksResult {
    [name: string]: IGetApplicationStacksResultStack;
}

const removeProtocol = (url: string): string => {
    return url.replace(/^https?:\/\//, "");
};

const getApiDomainName = (results: IPromiseResult[], name: string): string => {
    const api = results.find(r => r.name === name && r.app === "api");
    if (!api?.stack?.apiDomain) {
        throw new Error(`Missing API stack for "${name}" deployment.`);
    }
    return removeProtocol(api.stack.apiDomain);
};

const getAdminDomainName = (results: IPromiseResult[], name: string): string => {
    const admin = results.find(r => r.name === name && r.app === "admin");
    if (!admin?.stack?.appDomain) {
        throw new Error(`Missing Admin stack for "${name}" deployment.`);
    }
    return removeProtocol(admin.stack.appDomain);
};

const getWebsiteDomainName = (results: IPromiseResult[], name: string): string | undefined => {
    const website = results.find(r => r.name === name && r.app === "website");
    if (!website?.stack?.deliveryDomain) {
        return undefined;
    }
    return removeProtocol(website.stack.deliveryDomain);
};

const getPreviewDomainName = (results: IPromiseResult[], name: string): string | undefined => {
    const preview = results.find(r => r.name === name && r.app === "website");
    if (!preview?.stack?.appDomain) {
        return undefined;
    }
    return removeProtocol(preview.stack.appDomain);
};

const getEnv = (results: IPromiseResult[], name: string): string => {
    const env = results.find(r => r.name === name);
    if (!env) {
        throw new Error(`Missing environment for "${name}" deployment.`);
    }
    return env.env;
};

const getVariant = (results: IPromiseResult[], name: string): string | undefined => {
    const variant = results.find(r => r.name === name);
    if (!variant) {
        throw new Error(`Missing variant for "${name}" deployment.`);
    }
    return variant.variant;
};

export const getApplicationDomains = async (
    params: IGetApplicationStacks
): Promise<IGetApplicationStacksResult> => {
    const promises: Promise<IPromiseResult>[] = [];

    for (const stack of params.stacks) {
        for (const app of apps) {
            promises.push(
                new Promise<IPromiseResult>(resolve => {
                    const result = getStackOutput({
                        folder: `apps/${app}`,
                        env: stack.env,
                        variant: stack.variant
                    });
                    resolve({
                        env: stack.env,
                        variant: stack.variant,
                        name: stack.name,
                        app,
                        stack: result
                    });
                })
            );
        }
    }
    const results = await Promise.all(promises);
    const deployments: IGetApplicationStacksResult = {};
    const names = params.stacks.map(s => s.name);
    try {
        for (const name of names) {
            const env = getEnv(results, name);
            const variant = getVariant(results, name);
            const api = getApiDomainName(results, name);
            const admin = getAdminDomainName(results, name);
            const website = getWebsiteDomainName(results, name);
            const preview = getPreviewDomainName(results, name);
            if (!website && preview) {
                throw new Error(`Missing website stack for "${name}" deployment.`);
            } else if (website && !preview) {
                throw new Error(`Missing preview stack for "${name}" deployment.`);
            }
            deployments[name] = {
                env,
                variant,
                api,
                admin,
                website,
                preview
            };
        }
        return deployments;
    } catch (ex) {
        console.error(ex.message);
        throw ex;
    }
};
