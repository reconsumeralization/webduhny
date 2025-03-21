import { ButtonAction } from "./types";

export const ELEMENT_TYPE = "fub-button";

export const BUTTON_ACTION_OPTIONS: Array<{ id: ButtonAction; label: string }> = [
    { id: "previousStep", label: "Previous step" },
    { id: "nextStep", label: "Next step" },
    { id: "submit", label: "Submit" }
];
