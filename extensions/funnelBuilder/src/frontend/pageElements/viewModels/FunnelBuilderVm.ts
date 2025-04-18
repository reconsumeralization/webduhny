import { makeAutoObservable, observable } from "mobx";
import { FunnelModel } from "../models/FunnelModel";

export class FunnelBuilderVm {
    funnel: FunnelModel;

    constructor(input?: FunnelModel | Partial<FunnelModel>) {
        if (input instanceof FunnelModel) {
            this.funnel = input;
        } else {
            this.funnel = new FunnelModel(input);
        }

        // MobX only needs to track the relevant data structures:
        makeAutoObservable(this, {
            funnel: false, // Don't try to auto-observe the entire model
        },{ autoBind: true });

        // manually wrap model arrays with observable.array
        this.funnel.fields = observable.array(this.funnel.fields);
        this.funnel.steps = observable.array(this.funnel.steps);
    }

    static fromJSON(json: any) {
        const funnel = FunnelModel.fromJSON(json);
        return new FunnelBuilderVm(funnel);
    }

    toJSON() {
        return this.funnel.toJSON();
    }

    get fields() {
        return this.funnel.fields;
    }

    get steps() {
        return this.funnel.steps;
    }

    get fieldsCount() {
        return this.funnel.fields.length;
    }

    addField() {
        console.log('adujem')
        // @ts-ignore
        this.funnel.addField({});
    }

    removeField(field: any) {
        this.funnel.removeField(field);
    }
}
