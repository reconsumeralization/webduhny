import React from "react";
import { Text } from "~/Text";
import { makeDecoratable } from "~/utils";

interface DescriptionProps {
    text: React.ReactNode;
}

const DecoratableDescription = (props: DescriptionProps) => {
    return (
        <Text
            text={props.text}
            size={"sm"}
            as={"div"}
            className={"pt-xs pb-sm text-neutral-strong"}
        />
    );
};

const Description = makeDecoratable("Description", DecoratableDescription);

export { Description, type DescriptionProps };
