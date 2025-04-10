import React from "react";
import { Text, type TextProps } from "~/Text";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const formComponentDescriptionVariants = cva("wby-mb-sm wby-text-neutral-strong", {
    variants: {
        disabled: {
            true: "wby-text-neutral-disabled"
        }
    }
});

type FormComponentDescriptionProps = TextProps &
    VariantProps<typeof formComponentDescriptionVariants> & {
        text?: React.ReactNode;
    };

const DecoratableFormComponentDescription = ({
    text,
    disabled,
    className,
    ...props
}: FormComponentDescriptionProps) => {
    if (!text) {
        return null;
    }

    return (
        <Text
            {...props}
            size={"sm"}
            as={"div"}
            className={cn(formComponentDescriptionVariants({ disabled }), className)}
        >
            {text}
        </Text>
    );
};

const FormComponentDescription = makeDecoratable(
    "FormComponentDescription",
    DecoratableFormComponentDescription
);

export { FormComponentDescription, type FormComponentDescriptionProps };
