import React from "react";
import { Heading, Icon, Text } from "@webiny/admin-ui";
import { FbBuilderFieldPlugin } from "~/types";

interface FbFormModelFieldSelectorProps {
    fieldType: FbBuilderFieldPlugin["field"];
    onClick: (event: React.MouseEvent) => void;
}

const FbFormModelFieldSelector = ({ fieldType, onClick }: FbFormModelFieldSelectorProps) => {
    return (
        <div
            style={{ height: "140px" }}
            onClick={onClick}
            className={
                "wby-px-lg wby-py-md wby-flex wby-items-center wby-justify-center wby-bg-neutral-dimmed wby-rounded-lg wby-text-center hover:wby-bg-neutral-muted wby-transition-all wby-duration-200 wby-cursor-pointer"
            }
        >
            <div>
                <Icon
                    size={"lg"}
                    label={fieldType.label}
                    icon={fieldType.icon as React.ReactElement}
                    className={"wby-mx-auto wby-mb-md"}
                />
                <Heading level={5}>{fieldType.label}</Heading>
                <Text as={"div"} size={"sm"}>
                    {fieldType.description}
                </Text>
            </div>
        </div>
    );
};

export default FbFormModelFieldSelector;
