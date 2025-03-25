import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentNoteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
}

const DecoratableFormComponentNote = (props: FormComponentNoteProps) => {
    if (!props.text) {
        return null;
    }

    return (
        <Text size={"sm"} as={"div"} className={"wby-mt-sm wby-text-neutral-strong"}>
            {props.text}
        </Text>
    );
};

const FormComponentNote = makeDecoratable("FormComponentNote", DecoratableFormComponentNote);

export { FormComponentNote, type FormComponentNoteProps };
