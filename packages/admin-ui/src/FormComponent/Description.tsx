import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface FormComponentDescriptionProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    text?: React.ReactNode;
}

const DecoratableFormComponentDescription = (props: FormComponentDescriptionProps) => {
    if (!props.text) {
        return null;
    }

    return (
        <Text size={"sm"} as={"div"} className={"wby-mb-sm wby-text-neutral-strong"}>
            {props.text}
        </Text>
    );
};

const FormComponentDescription = makeDecoratable(
    "FormComponentDescription",
    DecoratableFormComponentDescription
);

export { FormComponentDescription, type FormComponentDescriptionProps };
