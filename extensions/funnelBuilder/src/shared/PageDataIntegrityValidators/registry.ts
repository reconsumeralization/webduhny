import { ContainerElementExists } from "./ContainerElementExists";
import { NoOrphanFieldElementsValidator } from "./NoOrphanFieldElementsValidator";
import { NoOrphanContainerFieldsValidator } from "./NoOrphanContainerFieldsValidator";

export const registry = [
    ContainerElementExists,
    NoOrphanContainerFieldsValidator,
    NoOrphanFieldElementsValidator
];
