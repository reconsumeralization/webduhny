import { FunnelModel } from "../../../shared/models/FunnelModel";
import {
    FunnelSubmissionModel,
} from "../../../shared/models/FunnelSubmissionModel";

interface FunnelSubmissionVmOptions {
    onChange?: () => {}
}

type Listener = () => void;

export class FunnelSubmissionVm {
    funnel: FunnelModel;
    funnelSubmission: FunnelSubmissionModel;
    options: FunnelSubmissionVmOptions;
    listeners: Set<Listener> = new Set();

    private changedOn = 0;

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

    setData(data: any) {
        this.funnelSubmission.setData(data);
    }

    submitActiveStep() {
        this.funnelSubmission.submitActiveStep();
        this.emitChange();
    }

    activatePreviousStep() {
        this.funnelSubmission.activatePreviousStep();
    }

    get activeStepIndex() {
        return this.funnelSubmission.getActiveStepIndex();
    }

    getChangedOn() {
        return this.changedOn;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private emitChange() {
        this.changedOn = Date.now();
        for (const listener of this.listeners) {
            listener();
        }
    }


}
