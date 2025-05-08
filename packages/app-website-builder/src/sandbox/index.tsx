import React from "react";
import { AddRoute } from "@webiny/app-admin";
import { DocumentEditorSandbox } from "~/sandbox/DocumentEditor.test.js";

export const Sandbox = () => {
    return <AddRoute path="/sandbox" element={<DocumentEditorSandbox />} />;
};
