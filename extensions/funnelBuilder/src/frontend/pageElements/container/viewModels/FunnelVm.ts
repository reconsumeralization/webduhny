import { makeAutoObservable } from "mobx";
import { FunnelModel } from "../models/FunnelModel";

export class FunnelVm {
    funnel: FunnelModel;

    constructor(input?: FunnelModel | Partial<FunnelModel>) {
        if (input instanceof FunnelModel) {
            this.funnel = input;
        } else {
            this.funnel = new FunnelModel(input);
        }

        makeAutoObservable(this);
    }

    static fromJSON(json: any) {
        const funnel = FunnelModel.fromJSON(json);
        return new FunnelVm(funnel);
    }

    toJSON() {
        return this.funnel.toJSON();
    }
}
