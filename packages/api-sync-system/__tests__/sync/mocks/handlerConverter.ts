import { createHandlerConverter } from "~/sync/handler/HandlerConverter.js";
import { NullCommandValue } from "~/sync/handler/converter/commands/NullCommandValue.js";
import type { ICommandConverter } from "~/sync/types.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import { createBatchGetCommandConverter } from "~/sync/handler/converter/BatchGetCommandConverter.js";
import { createGetCommandConverter } from "~/sync/handler/converter/GetCommandConverter.js";
import { createBatchWriteCommandConverter } from "~/sync/handler/converter/BatchWriteCommandConverter.js";
import { createPutCommandConverter } from "~/sync/handler/converter/PutCommandConverter.js";
import { createDeleteCommandConverter } from "~/sync/handler/converter/DeleteCommandConverter.js";
import { createUpdateCommandConverter } from "~/sync/handler/converter/UpdateCommandConverter.js";

export interface ICreateMockHandlerConverterCommandParams {
    commandConverters: NonEmptyArray<ICommandConverter> | "all";
}

export const createMockHandlerConverter = (params?: ICreateMockHandlerConverterCommandParams) => {
    const converter = createHandlerConverter({
        default: new NullCommandValue()
    });
    if (!params?.commandConverters) {
        return converter;
    }

    const commandConverters =
        params.commandConverters === "all"
            ? [
                  createBatchGetCommandConverter(),
                  createGetCommandConverter(),
                  createBatchWriteCommandConverter(),
                  createPutCommandConverter(),
                  createDeleteCommandConverter(),
                  createUpdateCommandConverter()
              ]
            : params.commandConverters;

    converter.register(commandConverters);

    return converter;
};
