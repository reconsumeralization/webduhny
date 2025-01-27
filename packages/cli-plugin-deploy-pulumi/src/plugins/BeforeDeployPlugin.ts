import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin";

class BeforeDeployPlugin extends PulumiCommandLifecycleEventHookPlugin {
    static type = "hook-before-deploy";
}

const createBeforeDeployPlugin = (callable: Callable) => {
    return new BeforeDeployPlugin(callable);
};
