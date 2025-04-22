import { FunnelModel, FunnelModelDto } from "../../../shared/models/FunnelModel";
import { FunnelSubmissionModel } from "../../../shared/models/FunnelSubmissionModel";

interface FunnelSubmissionVmOptions {
    onChange?: (funnel: FunnelModelDto) => void;
}

export class FunnelSubmissionVm {
    funnel: FunnelModel;
    funnelSubmission: FunnelSubmissionModel;
    options: FunnelSubmissionVmOptions;

    constructor(funnel: FunnelModel, options: FunnelSubmissionVmOptions = {}) {
        this.funnel = funnel;
        this.funnelSubmission = new FunnelSubmissionModel(funnel);
        this.options = options;
    }

    getField(fieldId: string) {
        return this.funnelSubmission.getField(fieldId);
    }

    private onChange() {
        if (!this.options.onChange) {
            return;
        }

        this.options.onChange(this.funnel.toDto());
    }
}
