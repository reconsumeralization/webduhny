import { FormElementElementData } from "../types";

export type ButtonAction = "previousStep" | "nextStep" | "submit";

export type ButtonElementData = FormElementElementData<{
    action: ButtonAction;
}>;
