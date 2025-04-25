import { FunnelModel } from "../../../shared/models/FunnelModel";
import {
    FunnelSubmissionModel,
} from "../../../shared/models/FunnelSubmissionModel";

interface FunnelSubmissionVmOptions {}

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

    fieldExists(fieldId: string) {
        return this.funnelSubmission.fieldExists(fieldId);
    }

    submitActiveStep() {
        this.funnelSubmission.submitActiveStep();
    }

}
