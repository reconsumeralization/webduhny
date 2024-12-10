import { Abstraction, createImplementation } from "@webiny/di-container";
import { ListCache } from "./ListCache";
import { CommandOption } from "~/Command";
import { container } from "../features/container";

export const SelectedOptionsCacheAbstraction = new Abstraction<ListCache<CommandOption>>(
    "SelectedOptionsCache"
);

const SelectedOptionsCacheImpl = createImplementation({
    abstraction: SelectedOptionsCacheAbstraction,
    implementation: ListCache<CommandOption>,
    dependencies: []
});

container.register(SelectedOptionsCacheImpl).inSingletonScope();
