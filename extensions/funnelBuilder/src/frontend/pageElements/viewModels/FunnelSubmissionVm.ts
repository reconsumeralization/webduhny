import { FunnelModel } from "../../../shared/models/FunnelModel";
import { FunnelSubmissionModel } from "../../../shared/models/FunnelSubmissionModel";

type Listener = () => void;

export class FunnelSubmissionVm {
    funnel: FunnelModel;
    funnelSubmission: FunnelSubmissionModel;
    listeners: Set<Listener> = new Set();

    constructor(funnel: FunnelModel) {
        this.funnel = funnel;
        this.funnelSubmission = new FunnelSubmissionModel(funnel);
    }

    getField(fieldId: string) {
        return this.funnelSubmission.getField(fieldId);
    }

    fieldExists(fieldId: string) {
        return this.funnelSubmission.fieldExists(fieldId);
    }

    setData(data: any) {
        this.funnelSubmission.setData(data);
        this.emitChange();
    }

    submitActiveStep() {
        this.funnelSubmission.submitActiveStep();
        this.emitChange();
    }

    activatePreviousStep() {
        this.funnelSubmission.activatePreviousStep();
        this.emitChange();
    }

    get activeStepIndex() {
        return this.funnelSubmission.getActiveStepIndex();
    }

    get activeStepId() {
        return this.funnelSubmission.activeStepId;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private emitChange() {
        for (const listener of this.listeners) {
            listener();
        }
    }

    getChecksum() {
        return this.funnelSubmission.getChecksum();
    }
}
