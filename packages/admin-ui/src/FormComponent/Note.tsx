import React from "react";
import { Text, type TextProps } from "~/Text";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const formComponentNoteVariants = cva("wby-mt-sm wby-text-neutral-strong", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    }
});

type FormComponentNoteProps = TextProps &
    VariantProps<typeof formComponentNoteVariants> & {
        text?: React.ReactNode;
    };

const DecoratableFormComponentNote = ({
    disabled,
    text,
    className,
    ...props
}: FormComponentNoteProps) => {
    if (!text) {
        return null;
    }

    return (
        <Text
            {...props}
            size={"sm"}
            as={"div"}
            className={cn(formComponentNoteVariants({ disabled }), className)}
        >
            {text}
        </Text>
    );
};

const FormComponentNote = makeDecoratable("FormComponentNote", DecoratableFormComponentNote);

export { FormComponentNote, type FormComponentNoteProps };
