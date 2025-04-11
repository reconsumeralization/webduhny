import React, { useCallback } from "react";
import { CmsModel } from "~/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DropdownMenu, Text, Icon } from "@webiny/admin-ui";

interface IconProps {
    model: Pick<CmsModel, "icon">;
}

const DisplayIcon = ({ model }: IconProps) => {
    if (!model.icon) {
        return null;
    }
    return (
        <Icon
            icon={<FontAwesomeIcon icon={(model.icon || "").split("/") as IconProp} />}
            label={"Model icon"}
            size={"lg"}
            className={"wby-text-neutral-strong"}
        />
    );
};

interface OptionsModelListItemProps {
    model: Pick<CmsModel, "modelId" | "name" | "description" | "icon">;
    onClick: (modelId: string) => void;
}

export const OptionsModelListItem = ({
    model,
    onClick: originalOnClick
}: OptionsModelListItemProps) => {
    const onClick = useCallback(() => {
        originalOnClick(model.modelId);
    }, [originalOnClick]);
    return (
        <DropdownMenu.Item
            onClick={onClick}
            icon={<DisplayIcon model={model} />}
            text={
                <div>
                    <Text as={"div"}>{model.name}</Text>
                    <Text as={"div"} size={"sm"} className={"wby-text-neutral-strong"}>
                        {model.description}
                    </Text>
                </div>
            }
        />
    );
};
