import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { CmsDynamicZoneTemplate } from "~/types";
import { TemplateIcon } from "~/admin/plugins/fieldRenderers/dynamicZone/TemplateIcon";
import { Button, Heading, Text } from "@webiny/admin-ui";

export interface TemplateCardProps {
    template: CmsDynamicZoneTemplate;
    onTemplate: (template: CmsDynamicZoneTemplate) => void;
}

export const TemplateItem = makeDecoratable(
    "TemplateItem",
    ({ template, onTemplate }: TemplateCardProps) => {
        return (
            <div
                className={
                    "wby-flex wby-flex-col wby-justify-between wby-bg-neutral-base wby-rounded-sm wby-shadow-sm wby-overflow-hidden"
                }
            >
                <div>
                    <div className={"wby-text-center wby-p-lg wby-bg-neutral-muted"}>
                        <TemplateIcon icon={template.icon} />
                    </div>
                    <div className={"wby-pt-md wby-px-md wby-text-left"}>
                        <Heading level={6} className={"wby-mb-xs"}>
                            {template.name}
                        </Heading>
                        <Text size={"sm"} as={"div"} className={"wby-text-neutral-strong"}>
                            {template.description}
                        </Text>
                    </div>
                </div>
                <div className={"wby-p-sm wby-text-right"}>
                    <Button size={"sm"} text={"Insert"} onClick={() => onTemplate(template)} />
                </div>
            </div>
        );
    }
);
