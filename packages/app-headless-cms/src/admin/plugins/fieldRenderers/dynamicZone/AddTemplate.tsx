import React, { useState } from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as AddCircleIcon } from "@webiny/icons/add_circle_outline.svg";
import { CmsDynamicZoneTemplate, CmsDynamicZoneTemplateWithTypename } from "~/types";
import { TemplateGallery } from "./TemplateGallery";
import { useTemplateTypename } from "~/admin/plugins/fieldRenderers/dynamicZone/useTemplateTypename";
import { Button, IconButton, Link, Text, Tooltip } from "@webiny/admin-ui";

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
        <>
            {showGallery ? (
                <TemplateGallery onTemplate={onTemplate} onClose={onGalleryClose} />
            ) : (
                <div
                    className={
                        "wby-w-full wby-text-center wby-flex wby-flex-col wby-px-xl wby-pt-xl wby-pb-lg wby-gap-sm-extra wby-bg-neutral-subtle wby-rounded"
                    }
                >
                    <Button
                        size={"sm"}
                        variant={"tertiary"}
                        onClick={browseTemplates}
                        text={"Pick a template"}
                        icon={<AddIcon />}
                    />
                    <div
                        className={
                            "wby-flex wby-items-center wby-justify-center wby-gap-xs wby-w-full wby-mx-auto wby-text-center"
                        }
                    >
                        <Text size={"sm"} className={"wby-text-neutral-strong"}>
                            <Link
                                to={"http://webiny.link/admin/how-to-use/dynamic-zones"}
                                target={"_blank"}
                            >
                                Learn how
                            </Link>{" "}
                            templates and dynamic zones work.
                        </Text>
                    </div>
                </div>
            )}
        </>
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
                <Tooltip
                    content={"Add template"}
                    trigger={
                        <IconButton
                            onClick={browseTemplates}
                            icon={<AddCircleIcon />}
                            size={"lg"}
                            variant={"ghost"}
                        />
                    }
                />
            )}
        </div>
    );
};
