import React, { useState } from "react";
import { ReactComponent as InfoIcon } from "@webiny/icons/info.svg";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as AddCircleIcon } from "@webiny/icons/add_circle_outline.svg";
import { CmsDynamicZoneTemplate, CmsDynamicZoneTemplateWithTypename } from "~/types";
import { TemplateGallery } from "./TemplateGallery";
import { useTemplateTypename } from "~/admin/plugins/fieldRenderers/dynamicZone/useTemplateTypename";
import { Button, Icon, IconButton, Link, Text } from "@webiny/admin-ui";

interface UseAddTemplateParams {
    onTemplate: (template: CmsDynamicZoneTemplateWithTypename) => void;
}

function useAddTemplate(params: UseAddTemplateParams) {
    const [showGallery, setShowGallery] = useState(false);
    const { getFullTypename } = useTemplateTypename();

    const browseTemplates = () => {
        setShowGallery(true);
    };

    const onTemplate = (template: CmsDynamicZoneTemplate) => {
        params.onTemplate({ ...template, __typename: getFullTypename(template) });
        onGalleryClose();
    };

    const onGalleryClose = () => {
        setShowGallery(false);
    };

    return {
        showGallery,
        browseTemplates,
        onTemplate,
        onGalleryClose
    };
}

interface AddTemplateProps {
    label?: string;
    onTemplate: UseAddTemplateParams["onTemplate"];
}

export const AddTemplateButton = (props: AddTemplateProps) => {
    const { showGallery, onTemplate, browseTemplates, onGalleryClose } = useAddTemplate({
        onTemplate: props.onTemplate
    });

    return (
        <div
            className={
                "wby-flex wby-flex-col wby-gap-sm-extra wby-p-xl wby-pb-lg wby-border-sm wby-border-neutral-dimmed wby-rounded"
            }
        >
            <div className={"wby-w-full wby-text-center"}>
                {showGallery ? (
                    <TemplateGallery onTemplate={onTemplate} onClose={onGalleryClose} />
                ) : (
                    <Button
                        variant={"secondary"}
                        onClick={browseTemplates}
                        text={"Add a template"}
                        icon={<AddIcon />}
                    />
                )}
            </div>
            <div className={"wby-flex wby-items-center wby-justify-center wby-gap-xs"}>
                <Icon icon={<InfoIcon />} label={"Info"} size={"sm"} color={"neutral-light"} />
                <Text size={"sm"}>
                    <Link to={"http://webiny.link/admin/how-to-use/dynamic-zones"}>Click here</Link>{" "}
                    to learn how templates and dynamic zones work
                </Text>
            </div>
        </div>
    );
};

export const AddTemplateIcon = (props: AddTemplateProps) => {
    const { showGallery, onTemplate, browseTemplates, onGalleryClose } = useAddTemplate({
        onTemplate: props.onTemplate
    });

    return (
        <div className={"wby-w-full wby-text-center wby-mt-md"}>
            {showGallery ? (
                <TemplateGallery onTemplate={onTemplate} onClose={onGalleryClose} />
            ) : (
                <IconButton
                    onClick={browseTemplates}
                    icon={<AddCircleIcon />}
                    size={"lg"}
                    variant={"ghost"}
                />
            )}
        </div>
    );
};
