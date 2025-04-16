import { FieldElementData } from "../types";

export type ButtonAction = "previousStep" | "nextStep" | "submit";

export type ButtonElementData = FieldElementData<{
    action: ButtonAction;
}>;
