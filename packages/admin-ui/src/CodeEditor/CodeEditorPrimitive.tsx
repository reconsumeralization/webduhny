import React from "react";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import { makeDecoratable } from "~/utils";

// Modes
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-json";
// Extensions
import "ace-builds/src-noconflict/ext-searchbox";
// Themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-chrome";

interface CodeEditorPrimitiveProps extends React.ComponentProps<typeof AceEditor> {
    mode: string;
    disabled?: boolean;
}

const DecoratableCodeEditorPrimitive = ({
    value,
    theme = "github",
    disabled,
    ...rest
}: CodeEditorPrimitiveProps) => {
    return (
        <AceEditor
            value={value ? String(value) : ""}
            theme={theme}
            readOnly={disabled}
            {...rest}
            width="100%"
            editorProps={{
                $blockScrolling: Infinity // Suppresses scrolling warning in console.
            }}
        />
    );
};

const CodeEditorPrimitive = makeDecoratable("CodeEditorPrimitive", DecoratableCodeEditorPrimitive);

export { CodeEditorPrimitive, type CodeEditorPrimitiveProps };
