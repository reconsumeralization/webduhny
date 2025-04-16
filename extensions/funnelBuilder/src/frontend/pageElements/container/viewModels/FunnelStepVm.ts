import { makeAutoObservable } from "mobx";
import { FunnelStepModel } from "../models/FunnelStepModel";

export class FunnelStepVm {
    step: FunnelStepModel;

    constructor(step: FunnelStepModel) {
        this.step = step;
        makeAutoObservable(this);
    }

    setName(name: string) {
        this.step.name = name;
    }

    setTarget(target: string) {
        this.step.target = target;
    }

    // add other mutators as needed
}
