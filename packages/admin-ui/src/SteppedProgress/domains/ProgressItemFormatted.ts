import type { ProgressItemState } from "./ProgressItemState";

export interface ProgressItemFormatted {
    id: string;
    label: string;
    disabled: boolean;
    errored: boolean;
    state: ProgressItemState;
}
