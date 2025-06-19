import { createImplementation } from "./createImplementation";
import { OnPageBeforeCreate } from "./sandboxAbs";

class SendSmsBeforePageCreate implements OnPageBeforeCreate.Interface {
    constructor(security: Modules.Security.Interface) {
    }

    execute(page: any): Promise<void> {
        return Promise.resolve(undefined);
    }


}

export default createImplementation({
    abstraction: OnPageBeforeCreate,
    implementation: SendSmsBeforePageCreate,
    dependencies: [],
});


export default OnPageBeforeCreate.implement(SendSmsBeforePageCreate, [])
