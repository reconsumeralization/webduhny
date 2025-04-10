import React from "react";

import { Bind } from "@webiny/form";
import { useInputField } from "~/components";
import { RadioGroup } from "@webiny/admin-ui";

export const Boolean = () => {
    const { name } = useInputField();

    return (
        <Bind name={name}>
            {({ value, onChange, validation }) => (
                <div className="wby-w-full wby-mt-lg">
                    <RadioGroup
                        validation={validation}
                        onChange={onChange}
                        value={value}
                        items={[
                            {
                                label: "True",
                                value: "true"
                            },
                            {
                                label: "False",
                                value: "false"
                            }
                        ]}
                    />
                </div>
            )}
        </Bind>
    );
};
