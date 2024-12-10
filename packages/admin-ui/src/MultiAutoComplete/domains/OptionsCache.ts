import { Abstraction, createImplementation } from "@webiny/di-container";
import { IListCache, ListCache } from "./ListCache";
import { CommandOption } from "~/Command";
import { container } from "../features/container";

export const OptionsCacheAbstraction = new Abstraction<IListCache<CommandOption>>("OptionsCache");

const OptionsCacheImpl = createImplementation({
    abstraction: OptionsCacheAbstraction,
    implementation: ListCache<CommandOption>,
    dependencies: []
});

container.register(OptionsCacheImpl).inSingletonScope();
