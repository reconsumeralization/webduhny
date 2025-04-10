import { makeAutoObservable } from "mobx";
import type { OnDataTableColumnVisibilityChange } from "@webiny/admin-ui";
import { IColumnsVisibilityRepository } from "./IColumnsVisibilityRepository";
import { IColumnsVisibilityUpdater } from "./IColumnsVisibilityUpdater";

export class ColumnsVisibilityUpdater implements IColumnsVisibilityUpdater {
    private repository: IColumnsVisibilityRepository;

    constructor(repository: IColumnsVisibilityRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    public update: OnDataTableColumnVisibilityChange = async updaterOrValue => {
        const currentVisibility = this.repository.getVisibility();
        let newVisibility = currentVisibility;

        if (typeof updaterOrValue === "function") {
            newVisibility = updaterOrValue(currentVisibility || {});
        }

        this.repository.update(newVisibility || {});
    };
}
