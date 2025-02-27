import type { UpdatePageBlockInput } from "~/features/pageBlock/BlockGatewayInterface";

export interface SaveBlockActionArgsType {
    execute(data: UpdatePageBlockInput): Promise<void>;
    debounce?: boolean;
    onFinish?: () => void;
    onError?: () => void;
}
