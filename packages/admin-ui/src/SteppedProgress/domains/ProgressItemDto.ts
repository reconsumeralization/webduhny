import type { ProgressItemState } from "./ProgressItemState";

export interface ProgressItemDto {
    id?: string;
    label: string;
    disabled?: boolean;
    errored?: boolean;
    state?: ProgressItemState;
}
