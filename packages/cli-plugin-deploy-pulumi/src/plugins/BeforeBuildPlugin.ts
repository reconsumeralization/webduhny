import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin";

export class BeforeBuildPlugin extends PulumiCommandLifecycleEventHookPlugin {
    static type = "hook-before-build";
}

export const createBeforeBuildPlugin = (callable: Callable) => {
    return new BeforeBuildPlugin(callable);
};
