import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface NoteProps {
    text: React.ReactNode;
}

const DecoratableNote = (props: NoteProps) => {
    return <Text text={props.text} size={"sm"} as={"div"} className={"text-neutral-strong"} />;
};

const Note = makeDecoratable("Note", DecoratableNote);

export { Note, type NoteProps };
