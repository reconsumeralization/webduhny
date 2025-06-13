import type { ProgressItem } from "~/SteppedProgress/domains/ProgressItem";
import type { ProgressItemFormatted } from "~/SteppedProgress/domains/ProgressItemFormatted";

export class ProgressItemFormatter {
    static format(item: ProgressItem): ProgressItemFormatted {
        return {
            id: item.id,
            label: item.label,
            disabled: item.disabled,
            errored: item.errored,
            state: item.state
        };
    }
}
