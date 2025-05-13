import React from "react";
import { Editor } from "./Editor";

export const DocumentEditorContext = React.createContext<Editor<any> | undefined>(undefined);
